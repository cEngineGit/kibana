/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  bucketSpan,
  categoriesMessageField,
  getJobId,
  partitionField,
} from '../../../../common/log_analysis';

import {
  ModuleDescriptor,
  ModuleSourceConfiguration,
  cleanUpJobsAndDatafeeds,
} from '../../../containers/logs/log_analysis';
import { callJobsSummaryAPI } from '../../../containers/logs/log_analysis/api/ml_get_jobs_summary_api';
import { callGetMlModuleAPI } from '../../../containers/logs/log_analysis/api/ml_get_module';
import { callSetupMlModuleAPI } from '../../../containers/logs/log_analysis/api/ml_setup_module_api';
import { callValidateIndicesAPI } from '../../../containers/logs/log_analysis/api/validate_indices';

const jobTypes = ['log-entry-categories-count'];
const moduleId = 'logs_ui_categories';

type JobType = typeof jobTypes[0];

const getJobIds = (spaceId: string, sourceId: string) =>
  jobTypes.reduce(
    (accumulatedJobIds, jobType) => ({
      ...accumulatedJobIds,
      [jobType]: getJobId(spaceId, sourceId, jobType),
    }),
    {} as Record<JobType, string>
  );

const getJobSummary = async (spaceId: string, sourceId: string) => {
  const response = await callJobsSummaryAPI(spaceId, sourceId, jobTypes);
  const jobIds = Object.values(getJobIds(spaceId, sourceId));

  return response.filter(jobSummary => jobIds.includes(jobSummary.id));
};

const getModuleDefinition = async () => {
  return await callGetMlModuleAPI(moduleId);
};

const setUpModule = async (
  start: number | undefined,
  end: number | undefined,
  { spaceId, sourceId, indices, timestampField }: ModuleSourceConfiguration
) => {
  const indexNamePattern = indices.join(',');
  const jobOverrides = [
    {
      job_id: 'log-entry-categories-count' as const,
      analysis_config: {
        bucket_span: `${bucketSpan}ms`,
      },
      data_description: {
        time_field: timestampField,
      },
      custom_settings: {
        logs_source_config: {
          indexPattern: indexNamePattern,
          timestampField,
          bucketSpan,
        },
      },
    },
  ];

  return callSetupMlModuleAPI(
    moduleId,
    start,
    end,
    spaceId,
    sourceId,
    indexNamePattern,
    jobOverrides
  );
};

const cleanUpModule = async (spaceId: string, sourceId: string) => {
  return await cleanUpJobsAndDatafeeds(spaceId, sourceId, jobTypes);
};

const validateSetupIndices = async ({ indices, timestampField }: ModuleSourceConfiguration) => {
  return await callValidateIndicesAPI(indices, [
    {
      name: timestampField,
      validTypes: ['date'],
    },
    {
      name: partitionField,
      validTypes: ['keyword'],
    },
    {
      name: categoriesMessageField,
      validTypes: ['text'],
    },
  ]);
};

export const logEntryCategoriesModule: ModuleDescriptor<JobType> = {
  moduleId,
  jobTypes,
  bucketSpan,
  getJobIds,
  getJobSummary,
  getModuleDefinition,
  setUpModule,
  cleanUpModule,
  validateSetupIndices,
};
