import Context from './@types/context';
import PluginConfig from './@types/pluginConfig';
declare const publish: ({ extensionId, target, asset }: PluginConfig, { logger }: Context) => Promise<{
    name: string;
    url: string;
}>;
export default publish;
