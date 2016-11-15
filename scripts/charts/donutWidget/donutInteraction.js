import {addCheckboxObservers, getCheckedValues} from 'bootstrapCheckboxObserver.js';
import {drawDonut, updateDonut} from 'donut/donut.js';

export function createDonutWidget( chartConfig, cboxGroupName ){
	drawDonut(chartConfig);
	addCheckboxObservers(cboxGroupName, updateDonut);
}

