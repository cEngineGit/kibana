<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-public](./kibana-plugin-public.md) &gt; [ToastInputFields](./kibana-plugin-public.toastinputfields.md)

## ToastInputFields type

Allowed fields for [ToastInput](./kibana-plugin-public.toastinput.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare type ToastInputFields = Pick<EuiToast, Exclude<keyof EuiToast, 'id' | 'text' | 'title'>> & {
    title?: string | MountPoint;
    text?: string | MountPoint;
};
```

## Remarks

`id` cannot be specified.

