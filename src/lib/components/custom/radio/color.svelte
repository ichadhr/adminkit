<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import {cn} from '$lib/utils';
	import type {RadioLayoutProps, ColorVariant} from './index';

	export let value: string;
	export let id: string;
	export let disabled: RadioLayoutProps['disabled'] = false;
	export let variant: ColorVariant = 'default';

	$: radioClasses = cn('radio-item', `radio-${variant}`, disabled && 'disabled');
</script>

<RadioGroup.Item {value} {id} {disabled} class={radioClasses} />
