<template>
	<div :class="{ 'bg-gray-400': hasHighlight }">
		<div v-if="cell.direction === 'input'" @click="setFocus()" class=" border-gray-500 p-2">
			<div class="flex">
				<div v-if="executionId">
					<div class="my-2 text-gray-500 ml-1 w-max min-w-20">
						[{{ executionId }}]
					</div>
				</div>
				<div v-else>
					<div class="my-2 text-gray-500 w-max min-w-20">[ ]</div>
				</div>
				<div class="border-l-4 w-full dark:bg-[#333] bg-gray-100" :class="{
                'border-l-gray-500': !props.hasFocus,
                'border-l-green-500': props.hasFocus,
              }">
					<div class="flex" v-if="hasFocus">
						<div class="w-full dark:bg-[#666] bg-gray-200 ml-0">
							<div class="grid-container">
								<div class="col-start-5 m-1 flex">
									<div class="mt-1.5 flex">
										<div class="ml-1 cursor-pointer w-5 z-100" @click="runCell()">
											<icon-run class=" fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-run>
										</div>
										<div class="ml-1 cursor-pointer w-5 z-100" @click="smaller()">
											<icon-shrink class="fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-shrink>
										</div>
										<div class="ml-1 cursor-pointer w-5 z-100" @click="bigger()">
											<icon-expand class="fill-[#000] dark:fill-[#fff] stroke-[#000] dark:stroke-[#fff] "></icon-expand>
										</div>
										<div class="ml-1 mt-0 cursor-pointer" @click="deleteCell()">
											<icon-bin class="fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-bin>
										</div>
									</div>
									<div class="ml-1 mt-0 cursor-pointer">
										<Menu as="div" class="relative inline-block text-left">
											<div>
												<MenuButton class="bg-transparent w-[16px] h-[16px] m-1 p-0">
													<icon-gear class="stroke-[#000] dark:stroke-[#fff]/50 "></icon-gear>
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
												<MenuItems class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-sm bg-white dark:bg-[#666] shadow-sm ring-1 ring-black/5 focus:outline-none z-[300]">
													<div class="px-1 py-1">
														<MenuItem v-slot="{ active }">
															<div class="m-2 text-xs flex" @click="runCell()">
																<icon-run class="fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-run>
																<span class="ml-2">Run</span></div>
														</MenuItem>
														<MenuItem v-slot="{ active }">
															<div class="m-2 text-xs flex" @click="deleteCell()">
																<icon-bin class="fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-bin>
																<span class="ml-2">Delete</span></div>
														</MenuItem>
														<MenuItem v-slot="{ active }">
															<div class="m-2  text-xs flex" @click="addCell()">
																<icon-add class="  stroke-[#000] dark:stroke-[#fff]/70 "></icon-add>
																<span class="ml-2">Add</span></div>
														</MenuItem>
														<MenuItem v-slot="{ active }">
															<div class="m-2 text-xs">
																<hr class="opacity-50">
															</div>
														</MenuItem>
														<MenuItem v-slot="{ active }">
															<div class="m-2 text-xs flex" @click="smaller()">
																<icon-shrink class="  stroke-[#000] dark:stroke-[#fff]/70 "></icon-shrink>
																<span class="ml-2">Smaller Cell</span></div>
														</MenuItem>
														<MenuItem v-slot="{ active }">
															<div class="m-2 text-xs flex" @click="bigger()">
																<icon-expand class="fill-[#000] dark:fill-[#fff]/70 stroke-[#000] dark:stroke-[#fff]/70 "></icon-expand>
																<span class="ml-2">Larger Cell</span></div>
														</MenuItem>

													</div>

												</MenuItems>
											</transition>
										</Menu>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="props.cell.message.typeName == 'CodeMessage'">
						<CodeMessageRendering :message="props.cell.message" :controller="props.controller" />
					</div>
					<div v-if="props.cell.message.typeName == 'MarkdownMessage'">
						<MarkdownMessageRendering :message="props.cell.message" :controller="props.controller" />
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div>
				<template v-if="props.controller.view === 'default'">
					<div v-if="executionId">
						<div class="w-max min-w-20 my-2 ml-1 text-gray-500">
							[{{ executionId }}]
						</div>
					</div>
					<div v-else>
						<div class="w-max min-w-20 my-2 text-gray-500">[ ]</div>
					</div>
				</template>
				<div class="cell-output">
					<div v-if="props.cell.message.typeName == 'CodeMessage'">
						<CodeMessageRendering
							:message="props.cell.message"
							direction="output"
						/>
					</div>
					<div v-if="props.cell.message.typeName == 'ErrorMessage'">
						<ErrorMessageRendering
							:message="props.cell.message"
							direction="output"
						/>
					</div>
					<div v-if="props.cell.message.typeName == 'TextMessage'">
						<TextMessageRendering
							:message="props.cell.message"
							direction="output"
						/>
					</div>
					<div v-if="props.cell.message.typeName == 'MarkdownMessage'">
						<MarkdownMessageRendering
							:message="props.cell.message"
							direction="output"
						/>
					</div>
					<div v-if="props.cell.message.typeName == 'DataMessage'">
						<DataMessageRendering
							:message="props.cell.message"
							direction="output"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
	import { computed, onMounted, ref, watch, toRef } from "vue";
	import { NotebookCell } from "@orbifold/entities";
	import CodeMessageRendering from "~/components/rendering/CodeMessageRendering.vue";
	import TextMessageRendering from "~/components/rendering/TextMessageRendering.vue";
	import ErrorMessageRendering from "~/components/rendering/ErrorMessageRendering.vue";
	import MarkdownMessageRendering from "~/components/rendering/MarkdownMessageRendering.vue";
	import DataMessageRendering from "~/components/rendering/DataMessageRendering.vue";
	import { NotebookController } from "~/components/NotebookController";
	import IconRun from "~/components/icons/run.vue";
	import IconShrink from "~/components/icons/shrink.vue";
	// const hasFocus = computed(() => {
	//   return props.cell.hasFocus;
	// })
	const props = defineProps({
		cell: {
			type: NotebookCell,
			required: true,
		},
		controller: {
			type: NotebookController,
			required: true,
		},
		hasFocus: {
			type: Boolean,
			required: false,
		},
		hasHighlight: {
			type: Boolean,
			required: false,
		},
	});
	const executionId = computed(() => {
		return props.cell.executionId;
	});
	const hasHighlight = toRef(props.hasHighlight);
	// watch(
	//     ()=>props.cell,
	//     (newVal) => {
	//       executionId.value = newVal.executionId||"";
	//     },
	//     { immediate: true, deep: true }
	//   );

	onMounted(() => {
		// hasFocus.value = props.cell.hasFocus;
	});

	function setFocus() {
		// hasFocus.value = true;
		props.controller.setFocus(props.cell.message.id);
	}

	function deleteCell() {
		props.controller.deleteCell(props.cell.message.id);
	}

	function runCell() {
		props.controller?.executeCell(props.cell.message);
	}

	function addCell() {
		props.controller.addCell(null, props.cell.message.id, "after", 4);
	}

	function bigger() {
		props.controller.setColSpan(props.cell.message.id, props.cell.colSpan + 1);
	}

	function smaller() {

		props.controller.setColSpan(props.cell.message.id, props.cell.colSpan - 1);
	}
</script>
