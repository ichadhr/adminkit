<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import { Chart, Svg, Axis, Tooltip, Area, Highlight } from 'layerchart';
	import { format as formatDate } from 'date-fns';

	export let data;
	const items = [{ content: '' }, { content: '' }, { content: '' }];

	/**
	 * * Known Issue:
	 * * LayerCake shows height warning due to ResizeObserver timing in Svelte 5.
	 * * The warning "[LayerCake] Target div has zero or negative height" is expected
	 * * and doesn't affect chart functionality.
	 * * This will be addressed in future layerchart updates.
	 *
	 * * @see https://github.com/techniq/layerchart/issues/291
	 */
</script>

<main class="mb-5 flex flex-1 flex-col gap-4 p-4 pt-0">
	<section class="grid auto-rows-min gap-4 md:grid-cols-3">
		{#each items as item}
			<div class="aspect-video rounded-xl bg-muted/50">
				{item.content}
			</div>
		{/each}
	</section>
	<div class="h-[400px] w-full">
		<div class="relative h-full w-full rounded border p-4">
			<Chart
				data={data.stockData}
				x="date"
				xScale={scaleTime()}
				y="value"
				yDomain={[0, null]}
				yNice
				padding={{ left: 16, bottom: 24 }}
				tooltip={{ mode: 'bisect-x' }}
			>
				<Svg>
					<Axis placement="left" grid rule />
					<Axis placement="bottom" rule />
					<Area line={{ class: 'stroke-1 stroke-primary' }} class="fill-primary/30" />
					<Highlight points lines />
				</Svg>
				<Tooltip.Root let:data>
					<Tooltip.Header>{formatDate(data.date, 'eee, MMMM do y')}</Tooltip.Header>
					<Tooltip.List>
						<Tooltip.Item label="value" value={data.value} />
					</Tooltip.List>
				</Tooltip.Root>
			</Chart>
		</div>
	</div>
</main>
