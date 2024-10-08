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
			<filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
				<feComponentTransfer in="SourceAlpha">
					<feFuncA type="table" tableValues="1 0" />
				</feComponentTransfer>
				<feGaussianBlur stdDeviation="2" />
				<feOffset dx="0" dy="4" result="offsetblur" />
				<feFlood flood-color="var(--color-circle-shadow)" result="color" />
				<feComposite in2="offsetblur" operator="in" />
				<feComposite in2="SourceAlpha" operator="in" />
				<feMerge>
					<feMergeNode in="SourceGraphic" />
					<feMergeNode />
				</feMerge>
			</filter>
			<filter id="progress-shadow" x="-50%" y="-50%" width="200%" height="200%">
				<feComponentTransfer in="SourceAlpha">
					<feFuncA type="table" tableValues="1 0" />
				</feComponentTransfer>
				<feGaussianBlur stdDeviation="5" />
				<feOffset dx="5" dy="0" result="offsetblur" />
				<feFlood flood-color="var(--color-progress-shadow)" result="color" />
				<feComposite in2="offsetblur" operator="in" />
				<feComposite in2="SourceAlpha" operator="in" />
				<feMerge>
					<feMergeNode in="SourceGraphic" />
					<feMergeNode />
				</feMerge>
			</filter>
			<filter id="progress-highlight" x="-50%" y="-50%" width="200%" height="200%">
				<feComponentTransfer in="SourceAlpha">
					<feFuncA type="table" tableValues="1 0" />
				</feComponentTransfer>

				<feOffset dx="-1" dy="0" result="offsetblur" />
				<feFlood flood-color="var(--color-progress-highlight)" result="color" />
				<feComposite in2="offsetblur" operator="in" />
				<feComposite in2="SourceAlpha" operator="in" />
				<feMerge>
					<feMergeNode in="SourceGraphic" />
					<feMergeNode />
				</feMerge>
			</filter>
			<circle class="bg-stroke"></circle>
			<circle filter="url(#inset-shadow)" class="bg"></circle>
			<circle filter="url(#progress-shadow)" class="fg"></circle>
			<circle filter="url(#progress-highlight)" class="fg"></circle>
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
		filter: drop-shadow(0 1px 0 var(--color-circle-highlight));
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
		stroke: var(--color-circle);
	}

	.circular-progress circle.fg {
		transform: rotate(-90deg);
		transform-origin: var(--half-size) var(--half-size);
		stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
		transition: stroke-dasharray 0.2s linear 0s;
		@apply stroke-sky-500 dark:stroke-sky-400;
	}
</style>
