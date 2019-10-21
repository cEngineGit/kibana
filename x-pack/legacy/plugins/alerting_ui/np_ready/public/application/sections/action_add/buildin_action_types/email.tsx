/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { Fragment } from 'react';
import {
  EuiFieldText,
  EuiFlexItem,
  EuiFlexGroup,
  EuiFieldNumber,
  EuiFieldPassword,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { Action } from '../../../lib/api';
import { ErrableFormRow } from '../../../components/page_error';
import { ActionTypeModel, Props } from '../../../../types';

export function getActionType(): ActionTypeModel {
  return {
    id: '.email',
    iconClass: 'email',
    selectMessage: i18n.translate(
      'xpack.alertingUI.sections.actions.emailAction.selectMessageText',
      {
        defaultMessage: 'Send an email from your server.',
      }
    ),
    simulatePrompt: i18n.translate(
      'xpack.alertingUI.sections.actions.emailAction.simulateButtonLabel',
      {
        defaultMessage: 'Send test email',
      }
    ),
    validate: (action: Action): any => {
      const validationResult = { errors: {} };
      const errors = {
        from: new Array<string>(),
        port: new Array<string>(),
        host: new Array<string>(),
        user: new Array<string>(),
        password: new Array<string>(),
      };
      validationResult.errors = errors;
      if (!action.config.from) {
        errors.from.push(
          i18n.translate('xpack.alertingUI.sections.addAction.error.requiredFromText', {
            defaultMessage: 'From is required.',
          })
        );
      }
      if (!action.config.port) {
        errors.port.push(
          i18n.translate('xpack.alertingUI.sections.addAction.error.requiredPortText', {
            defaultMessage: 'Port is required.',
          })
        );
      }
      if (!action.config.host) {
        errors.host.push(
          i18n.translate('xpack.alertingUI.sections.addAction.error.requiredHostText', {
            defaultMessage: 'Host is required.',
          })
        );
      }
      if (!action.secrets.user) {
        errors.user.push(
          i18n.translate('xpack.alertingUI.sections.addAction.error.requiredHostText', {
            defaultMessage: 'User is required.',
          })
        );
      }
      if (!action.secrets.password) {
        errors.password.push(
          i18n.translate('xpack.alertingUI.sections.addAction.error.requiredHostText', {
            defaultMessage: 'Password is required.',
          })
        );
      }
      return validationResult;
    },
    actionFields: EmailActionFields,
  };
}

const EmailActionFields: React.FunctionComponent<Props> = ({
  action,
  editActionConfig,
  editActionSecrets,
  errors,
  hasErrors,
}) => {
  const { from, host, port }: any = action.config;
  const { user, password }: any = action.secrets;

  return (
    <Fragment>
      <ErrableFormRow
        id="from"
        errorKey="from"
        fullWidth
        errors={errors}
        isShowingErrors={hasErrors === true && from !== undefined}
        label={i18n.translate('xpack.alertingUI.sections.actionAdd.emailAction.fromFieldLabel', {
          defaultMessage: 'From',
        })}
      >
        <EuiFieldText
          fullWidth
          name="from"
          value={from || ''}
          data-test-subj="fromInput"
          onChange={e => {
            editActionConfig('from', e.target.value);
          }}
          onBlur={() => {
            if (!from) {
              editActionConfig('from', '');
            }
          }}
        />
      </ErrableFormRow>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem>
          <ErrableFormRow
            id="emailHost"
            errorKey="host"
            fullWidth
            errors={errors}
            isShowingErrors={hasErrors === true && host !== undefined}
            label={i18n.translate('xpack.alertingUI.sections.actionAdd.emailHost.hostFieldLabel', {
              defaultMessage: 'Host',
            })}
          >
            <EuiFieldText
              fullWidth
              name="host"
              value={host || ''}
              data-test-subj="emailHostInput"
              onChange={e => {
                editActionConfig('host', e.target.value);
              }}
              onBlur={() => {
                if (!host) {
                  editActionConfig('host', '');
                }
              }}
            />
          </ErrableFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <ErrableFormRow
            id="emailPort"
            errorKey="port"
            fullWidth
            errors={errors}
            isShowingErrors={hasErrors === true && port !== undefined}
            label={i18n.translate('xpack.alertingUI.sections.actionAdd.emailPort.methodPortLabel', {
              defaultMessage: 'Port',
            })}
          >
            <EuiFieldNumber
              prepend=":"
              fullWidth
              name="port"
              value={port || ''}
              data-test-subj="emailPortInput"
              onChange={e => {
                editActionConfig('port', parseInt(e.target.value, 10));
              }}
              onBlur={() => {
                if (!port) {
                  editActionConfig('port', '');
                }
              }}
            />
          </ErrableFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem>
          <ErrableFormRow
            id="emailUser"
            errorKey="user"
            fullWidth
            errors={errors}
            isShowingErrors={hasErrors === true && user !== undefined}
            label={i18n.translate('xpack.alertingUI.sections.actionAdd.emailUser.userFieldLabel', {
              defaultMessage: 'User',
            })}
          >
            <EuiFieldText
              fullWidth
              name="user"
              value={user || ''}
              data-test-subj="emailUserInput"
              onChange={e => {
                editActionSecrets('user', e.target.value);
              }}
              onBlur={() => {
                if (!user) {
                  editActionSecrets('user', '');
                }
              }}
            />
          </ErrableFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <ErrableFormRow
            id="emailPassword"
            errorKey="password"
            fullWidth
            errors={errors}
            isShowingErrors={hasErrors === true && password !== undefined}
            label={i18n.translate(
              'xpack.alertingUI.sections.actionAdd.emailPassword.methodPasswordLabel',
              {
                defaultMessage: 'Password',
              }
            )}
          >
            <EuiFieldPassword
              fullWidth
              name="password"
              value={password || ''}
              data-test-subj="emailPasswordInput"
              onChange={e => {
                editActionSecrets('password', e.target.value);
              }}
              onBlur={() => {
                if (!password) {
                  editActionSecrets('password', '');
                }
              }}
            />
          </ErrableFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};