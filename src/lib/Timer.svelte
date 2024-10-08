<script lang="ts">
	let count: number = 0;
	let isFinished: boolean = false;
	let duration: number = 120;
	setInterval(() => {
		if (count < duration) {
			count += 0.05;
		} else {
			isFinished = true;
		}

		if (Math.floor(count) % 30 === 0 && count % 1 < 0.05) {
			if ('vibrate' in navigator) {
				navigator.vibrate(200);
			}
		}
	}, 50);

	$: formattedCount = `${Math.floor(count / 60)
		.toString()
		.padStart(2, '0')}:${Math.floor(count % 60)
		.toString()
		.padStart(2, '0')}`;

	$: progress = (count / duration) * 100;
</script>

<div class="grid h-[250px] w-[250px]">
	<div class="col-[1] row-[1] inline-flex items-center justify-center text-5xl font-bold">
		{#if isFinished}
			<span class="text-center">😁</span>
		{:else}
			{#each formattedCount as char}
				<span class="w-8 text-center">{char}</span>
			{/each}
		{/if}
	</div>
	<div class="col-[1] row-[1]">
		<svg
			width="250"
			height="250"
			viewBox="0 0 250 250"
			class="circular-progress"
			style="--progress: {progress};"
		>
			<circle class="bg"></circle>
			<circle class="fg"></circle>
		</svg>
	</div>
</div>

<style lang="postcss">
	/* Credits to https://www.30secondsofcode.org/css/s/circular-progress-bar/ */
	.circular-progress {
		--size: 250px;
		--half-size: calc(var(--size) / 2);
		--stroke-width: 20px;
		--radius: calc((var(--size) - var(--stroke-width)) / 2);
		--circumference: calc(var(--radius) * pi * 2);
		--dash: calc((var(--progress) * var(--circumference)) / 100);
	}

	.circular-progress circle {
		cx: var(--half-size);
		cy: var(--half-size);
		r: var(--radius);
		stroke-width: var(--stroke-width);
		fill: none;
		stroke-linecap: round;
	}

	.circular-progress circle.bg {
		@apply stroke-slate-200 dark:stroke-slate-700;
	}

	.circular-progress circle.fg {
		transform: rotate(-90deg);
		transform-origin: var(--half-size) var(--half-size);
		stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
		transition: stroke-dasharray 0.3s linear 0s;
		@apply stroke-sky-500 dark:stroke-sky-400;
	}
</style>
