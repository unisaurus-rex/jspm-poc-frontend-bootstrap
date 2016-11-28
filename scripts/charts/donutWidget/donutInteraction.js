import {addCheckboxObservers, getCheckedValues} from 'bootstrapCheckboxObserver.js';
import {drawDonut, updateDonut} from 'donut/donut.js';

export function createDonutWidget( chartConfig, cboxGroupName ){
	var cb = drawDonut(chartConfig);
	addCheckboxObservers(cboxGroupName, cb);
}
