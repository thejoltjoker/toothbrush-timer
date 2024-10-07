<script>
	import './app.css';
	import Timer from './lib/Timer.svelte';
</script>

<main class="grid h-screen">
	<div
		class="col-[1] row-[1] flex flex-col items-center justify-start gap-4 p-4 text-slate-900 dark:text-slate-50"
	>
		<h1 class="text-center text-2xl font-extrabold">🪥 Toothbrush Timer</h1>
	</div>
	<div class="col-[1] row-[1] flex flex-col items-center justify-center">
		<Timer />
	</div>
</main>
