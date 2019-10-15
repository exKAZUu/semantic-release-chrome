import Context from './@types/context';
import PluginConfig from './@types/pluginConfig';
declare const prepare: ({ manifestPath, distFolder, asset }: PluginConfig, { nextRelease, logger }: Context) => void;
export default prepare;
