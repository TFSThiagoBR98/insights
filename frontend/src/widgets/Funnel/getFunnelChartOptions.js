import { formatNumber } from '@/utils'
import { getColors } from '@/utils/colors'

export default function getFunnelChartOptions(labels, dataset, options) {
	if (!labels?.length || !dataset?.data?.length) {
		return {}
	}

	return {
		animation: false,
		color: getColors(),
		tooltip: {
			trigger: 'item',
			confine: true,
			appendToBody: false,
			formatter: (value) => (isNaN(value) ? value : formatNumber(value)),
		},
		legend: {
			data: labels,
			orient: 'vertical',
			left: '5%',
			top: 'center',
			formatter: (name) => {
				const index = labels.indexOf(name)
				const value = dataset.data[index]
				const percent = ((value / dataset.data[0]) * 100).toFixed(2)
				return `${name} (${percent}%)`
			},
		},
		series: [
			{
				name: dataset.label,
				type: 'funnel',
				colorBy: 'data',
				orient: 'vertical',
				funnelAlign: 'center',
				top: 'center',
				left: '30%',
				width: '60%',
				height: '80%',
				min: 0,
				max: 100,
				minSize: '10%',
				maxSize: '100%',
				sort: 'descending',
				label: {
					show: true,
					position: 'inside',
					formatter: '{c}',
				},
				gap: 14,
				data: dataset.data?.map((value, index) => ({
					name: labels[index],
					value,
					itemStyle: {
						borderColor: getColors()[index],
						borderWidth: 10,
						borderCap: 'round',
						borderJoin: 'round',
					},
					emphasis: {
						itemStyle: {
							color: getColors()[index],
							borderColor: getColors()[index],
							borderWidth: 15,
							borderCap: 'round',
							borderJoin: 'round',
						},
					},
				})),
			},
		],
	}
}
