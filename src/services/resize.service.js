
import ObserverService from './observer.service';
import UserAgentService from './useragent.service';

/**
 * Service: ResizeService
 * Listen for resize and reload events
 */
const ResizeService = {
  size: {
    height: UserAgentService.getScreenProperties().height.inner,
    width: UserAgentService.getScreenProperties().width.inner
  }
};

ObserverService.initialize(ResizeService, 'RESIZE', {});

export default ResizeService;
