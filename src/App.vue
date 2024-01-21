<template>
	<div class="relative bg-blue-700/90 dark:bg-[#333]">
		<img src="/fibers.jpg" alt="Fibers Rendering" class="object-cover h-11 w-[100vw] opacity-50 grayscale" />
		<h1 class="absolute text-2xl text-white ml-3 top-1/2  -translate-y-1/2">Qwiery Notebooks</h1>
		<div class="absolute text-sm text-white opacity-50   right-5 top-1/2  -translate-y-1/2 flex">
			<a href="https://github.com/Qwiery/qwiery-vue-notebook" target="_blank">
				<img src="https://img.shields.io/github/stars/Qwiery/qwiery-vue-notebook?style=social" alt="GitHub stars" />
			</a>
			<span class="ml-3">v{{ version }}</span>
		</div>
	</div>
  <div class="w-full bg-primary dark:bg-[#333] flex">
    <div v-if="!dashboardMode" class="flex text-white/70 cursor-pointer m-2" @click="addCode()"><icon-add class="stroke-[#fff]   mt-1"></icon-add> <span class="ml-1">Code</span></div>
    <div  v-if="!dashboardMode" class="flex text-white/70 cursor-pointer m-2" @click="addMarkdown()"><icon-add class="stroke-[#fff]   mt-1"></icon-add>  <span class="ml-1">Markdown</span></div>
    <div style="margin-left: auto;" class="m-2 flex">
		<div class="ml-1 mt-0 cursor-pointer">
			<Menu as="div" class="relative inline-block text-left">
				<div>
					<MenuButton class="bg-transparent w-[16px] h-[16px] m-1 p-0">
						<icon-gear stroke="#fff"></icon-gear>
					</MenuButton>
				</div>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-75 ease-in"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<MenuItems class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-sm  bg-white dark:bg-[#666] shadow-sm ring-1 ring-black/5 focus:outline-none z-[300]">
						<div class="px-1 py-1">
							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs flex" @click="runAll()">
									<icon-run></icon-run>
									<span class="ml-2">Run All</span></div>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs flex" @click="clearAllOutput()">
									<icon-sweep></icon-sweep>
									<span class="ml-2">Clear All Output</span></div>
							</MenuItem>

							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs">
									<hr class="opacity-50">
								</div>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs flex" @click="toggleView()">
									<icon-eye></icon-eye>
									<span class="ml-2">{{dashboardMode? 'Input Mode':'Dashboard Mode'}}</span></div>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs">
									<hr class="opacity-50">
								</div>
							</MenuItem>

							<MenuItem v-slot="{ active }">
								<div class="m-2 text-xs flex" @click="toggleTheme()">
									<icon-theme></icon-theme>
									<span class="ml-2">Toggle Theme</span></div>
							</MenuItem>

						</div>

					</MenuItems>
				</transition>
			</Menu>
		</div>

	</div>
  </div>

  <div class="flex justify-center items-center w-screen h-screen">
    <div
      class="  dark:border-[#333] rounded w-11/12 h-5/6 md:w-9/12 md:h-5/6 overflow-y-auto p-3"
    >
      <Notebook ref="nb" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Message, MarkdownMessage, CodeMessage } from "@orbifold/entities";
import { onMounted, ref, computed } from "vue";
import _ from "lodash";
import pkg from "../package.json";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import IconRun from "~/components/icons/run.vue";
import IconShrink from "~/components/icons/shrink.vue";
const nb = ref(null);
let notebook: any | null = null;
const version = ref("")
onMounted(() => {
  notebook = nb.value;
  window["nb"] = notebook;
  createStuff();
  version.value = pkg.version;
});

function addCell() {
  if (notebook) {
    notebook.addCell(
      new MarkdownMessage("# Aah"),
      null,
      "after",
      _.sample([1, 2, 3, 4])
    );
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark");
}
function toggleView() {
  if (notebook) {
    notebook.setView(
      notebook.getView() === "default" ? "dashboard" : "default"
    );
	dashboardMode.value =	  notebook.getView() !== "default"
  }
}
const dashboardMode = ref(false)
function createStuff() {
  // _.range(_.random(1, 10)).forEach((i) => {
  //   addCell();
  // });
  // setTimeout(() => {
  //   const cellId = _.sample(notebook.getInputCellIds());
  //   notebook.executeCell(cellId);
  // }, 1000 + Math.random() * 2000);
  const a=notebook.addCell(new CodeMessage("Q.data()"));
  const b = notebook.addCell(new CodeMessage(`Q.line(_.range(23).map(i=>_.random(100)))`));
  // notebook.executeCell(a.id);
  // notebook.executeCell(b.id);
}
function addCode() {
  if (notebook) {
	notebook.addCell(new CodeMessage("Q.data()"));
  }
}
function addMarkdown() {
  if (notebook) {
	notebook.addCell(new MarkdownMessage("# Aah"));
  }
}
function runAll() {
  if (notebook) {
	notebook.executeAll();
  }
}
function clearAllOutput() {
  if (notebook) {
	notebook.clearAllOutput();
  }
}
</script>
