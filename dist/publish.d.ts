import PluginConfig from './@types/pluginConfig';
declare const publish: ({ extensionId, target, asset }: PluginConfig) => Promise<{
    name: string;
    url: string;
}>;
export default publish;
