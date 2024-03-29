<template>
	<div class="grid grid-cols-4 gap-4">
		<div v-if="show"
			 v-for="tuple in groupedCells"
			 :key="tuple[0].executionId + tuple[0].hasHighlight + tuple[0].message.id"
			 class="rounded p-2 border-gray-500/30"
			 :class="{
        'border':currentView === 'default',
        'hidden': tuple.length === 1 && currentView === 'dashboard',
        'col-span-1': tuple[0].colSpan === 1,
        'col-span-2': tuple[0].colSpan === 2,
        'col-span-3': tuple[0].colSpan === 3,
        'col-span-4': tuple[0].colSpan === 4,
      }"
		>

			<div>
				<template v-if="currentView === 'default'">
					<template v-if="tuple.length === 1">
						<NotebookCellRendering
							:hasHighlight="tuple[0].hasHighlight"
							:cell="tuple[0]"
							:controller="controller"
							:hasFocus="tuple[0].hasFocus"
						/>
					</template>
					<template v-else>
						<NotebookCellRendering
							:hasHighlight="tuple[0].hasHighlight"
							:cell="tuple[0]"
							:controller="controller"
							:hasFocus="tuple[0].hasFocus"
						/>
						<NotebookCellRendering
							:cell="tuple[1]"
							:controller="controller"
							:hasFocus="tuple[1].hasFocus"
						/>
					</template>
				</template>
				<template v-if="currentView === 'dashboard'">
					<template v-if="tuple.length === 2">
						<NotebookCellRendering
							:cell="tuple[1]"
							:controller="controller"
							:hasFocus="tuple[1].hasFocus"
						/>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">

	import { computed, onMounted, ref, watch } from "vue";
	import { NotebookController } from "~/components/NotebookController";
	import NotebookCellRendering from "~/components/rendering/NotebookCellRendering.vue";
	import "~/assets/style.css";
	import { Message, NotebookCell } from "@orbifold/entities";
	// MVC logic
	const controller: NotebookController = new NotebookController();
	const cells: NotebookCell[] = ref([]);
	const show = ref(false);
	const groupedCells = ref([]);
	const currentView = ref("default");
	import { Utils } from "@orbifold/utils";

	/**
	 * Re-renders the notebook.
	 */
	function refreshAll() {
		show.value = false;

		cells.value = [];
		cells.value = controller.cells;

		// grouping the cells in tuple with input and output
		const coll = [];
		let previous = [];
		for (let i = 0; i < cells.value.length; i++) {
			const u = cells.value[i];
			if (u.direction === "input") {
				if (previous.length > 0) {
					coll.push(previous);
				}
				previous = [u];
			} else {
				previous.push(u);
				coll.push(previous);
				previous = [];
			}
		}
		if (previous.length > 0) {
			coll.push(previous);
		}

		show.value = true;
		groupedCells.value = coll;

	}

	onMounted(() => {
		controller.on("new-cell", refreshAll);
		controller.on("focus", setFocus);
		controller.on("delete-cell", refreshAll);
		controller.on("cellId", refreshAll);
		controller.on("before-execute", beforeExecute);
		controller.on("after-execute", afterExecute);
		controller.on("change-view", changeView);
		controller.on("refresh", refreshAll);
	});

	function getMessages() {
		return controller.getMessages();
	}

	/**
	 * Adds a cell to the notebook view.
	 */
	function addCell(
		message: Message | null = null,
		cellId: string | null = null,
		beforeOrAfter: string = "after",
		colSpan: number = 4,
	) {
		return controller.addCell(message, cellId, beforeOrAfter, colSpan);
	}

	function changeView(view: string) {
		currentView.value = view;
	}

	function setFocus(cellId) {
		controller.cells.forEach((cell) => {
			if (cell.message.id === cellId) {
				cell.hasFocus = true;
			} else {
				cell.hasFocus = false;
			}
		});
		refreshAll();
	}

	function beforeExecute(message) {
		controller.getCellById(message.id).hasHighlight = true;
	}

	function afterExecute(message) {
		controller.getCellById(message.id).hasHighlight = false;
	}

	function setExecutionId(messageId, cellId) {
		controller.setExecutionId(messageId, cellId);
	}

	function getCellIds() {
		return controller.getCellIds();
	}

	function getInputCellIds() {
		return controller.getInputCellIds();
	}

	function getExecutionIds() {
		return controller.getExecutionIds();
	}

	function executeCell(u: string | Message) {
		if (u instanceof Message) {
			controller.executeCell(u);
		} else {
			const c = controller.getCellById(u);
			if (c) {
				controller.executeCell(c.message);
			}
		}
	}

	function setView(view: string = "default") {
		if (!view) return;
		controller.view = view;
	}

	function getView() {
		return controller.view;
	}

	function executeAll() {
		controller.executeAll();
	}

	function clearAllOutput() {
		controller.clearAllOutput();
	}

	/**
	 * Set the interpreter for a given message type.
	 * @param language {string} The language to set the interpreter for.
	 * @param interpreter {function} The interpreting function.
	 */
	function setInterpreter(language: string, interpreter: ((message: Message) => Promise<Message>)) {
		const commonName = controller.toCommonLanguageName(language);
		controller.interpreters[commonName] = interpreter;
	}

	function setInputTransform( transform: ((message: Message) => Promise<Message>)) {

		controller.inputTransform = transform;
	}


	/**
	 * Expose the functions to the outside world.
	 */
	defineExpose({
		addCell,
		refreshAll,
		getCellIds,
		getExecutionIds,
		setExecutionId,
		executeCell,
		getInputCellIds,
		setView,
		getView,
		getMessages,
		executeAll,
		clearAllOutput,
		setInterpreter,
	});
	// const props = defineProps({
	//   view: {
	//     type: String,
	//     required: false,
	//     default: "default",
	//   },
	// });
</script>

