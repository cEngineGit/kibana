<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-server](./kibana-plugin-server.md) &gt; [HttpServiceSetup](./kibana-plugin-server.httpservicesetup.md) &gt; [registerOnPostAuth](./kibana-plugin-server.httpservicesetup.registeronpostauth.md)

## HttpServiceSetup.registerOnPostAuth property

To define custom logic to perform for incoming requests.

<b>Signature:</b>

```typescript
registerOnPostAuth: (handler: OnPostAuthHandler) => void;
```

## Remarks

Runs the handler after Auth interceptor did make sure a user has access to the requested resource. The auth state is available at stage via http.auth.get(..) Can register any number of registerOnPreAuth, which are called in sequence (from the first registered to the last). See [OnPostAuthHandler](./kibana-plugin-server.onpostauthhandler.md)<!-- -->.
