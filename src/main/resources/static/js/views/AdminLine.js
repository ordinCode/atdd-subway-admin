import {EVENT_TYPE} from "../../utils/constants.js";
import {colorSelectOptionTemplate, subwayLinesTemplate} from "../../utils/templates.js";
import {defaultSubwayLines} from "../../utils/subwayMockData.js";
import {subwayLineColorOptions} from "../../utils/defaultSubwayData.js";
import Modal from "../../ui/Modal.js";

function AdminLine() {
	const $subwayLineList = document.querySelector("#subway-line-list");
	const $subwayLineNameInput = document.querySelector("#subway-line-name");
	const $subwayLineColorInput = document.querySelector("#subway-line-color");
	const $subwayLineFirstTime = document.querySelector("#first-time");
	const $subwayLineLastTime = document.querySelector("#last-time");
	const $subwayLineIntervalTime = document.querySelector("#interval-time");

	const $createSubwayLineButton = document.querySelector(
		"#subway-line-create-form #submit-button"
	);
	const subwayLineModal = new Modal();

	const onCreateSubwayLine = event => {
		event.preventDefault();
		const newSubwayLine = {
			title: $subwayLineNameInput.value,
			bgColor: $subwayLineColorInput.value
		};

		fetch('/lines', {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				name: $subwayLineNameInput.value,
				startTime: $subwayLineFirstTime.value,
				endTime: $subwayLineLastTime.value,
				intervalTime: $subwayLineIntervalTime.value
			})
		}).then(res => {
			if (res.ok) {
				$subwayLineList.insertAdjacentHTML(
					"beforeend",
					subwayLinesTemplate(newSubwayLine)
				)
			} else {
				alert("이미 존재하는 이름입니다")
			}
		})

		subwayLineModal.toggle();
		$subwayLineNameInput.value = "";
		$subwayLineFirstTime.value = "";
		$subwayLineLastTime.value = "";
		$subwayLineIntervalTime.value = "";
		$subwayLineColorInput.value = "";
	};

	const onDeleteSubwayLine = event => {
		const $target = event.target;
		const name = $target.closest(".subway-line-item").innerText;
		const isDeleteButton = $target.classList.contains("mdi-delete");
		if (isDeleteButton) {
			fetch('/lines', {
				method: 'delete',
				headers: {
					'content-type': 'application/jason'
				},
				body: JSON.stringify({
					name: name
				})
			}).then(res => {
				$target.closest(".subway-line-item").remove()
			})
		}
	};

	const onUpdateSubwayLine = event => {
		const $target = event.target;
		const isUpdateButton = $target.classList.contains("mdi-pencil");
		if (isUpdateButton) {
			subwayLineModal.toggle();
		}
	};

	const onEditSubwayLine = event => {
		const $target = event.target;
		const isDeleteButton = $target.classList.contains("mdi-pencil");
	};

	const initDefaultSubwayLines = () => {
		defaultSubwayLines.map(line => {
			$subwayLineList.insertAdjacentHTML(
				"beforeend",
				subwayLinesTemplate(line)
			);
		});
	};

	const initEventListeners = () => {
		$subwayLineList.addEventListener(EVENT_TYPE.CLICK, onDeleteSubwayLine);
		$subwayLineList.addEventListener(EVENT_TYPE.CLICK, onUpdateSubwayLine);
		$createSubwayLineButton.addEventListener(
			EVENT_TYPE.CLICK,
			onCreateSubwayLine
		);
	};

	const onSelectColorHandler = event => {
		event.preventDefault();
		const $target = event.target;
		if ($target.classList.contains("color-select-option")) {
			document.querySelector("#subway-line-color").value =
				$target.dataset.color;
		}
	};

	const initCreateSubwayLineForm = () => {
		const $colorSelectContainer = document.querySelector(
			"#subway-line-color-select-container"
		);
		const colorSelectTemplate = subwayLineColorOptions
			.map((option, index) => colorSelectOptionTemplate(option, index))
			.join("");
		$colorSelectContainer.insertAdjacentHTML("beforeend", colorSelectTemplate);
		$colorSelectContainer.addEventListener(
			EVENT_TYPE.CLICK,
			onSelectColorHandler
		);
	};

	this.init = () => {
		initDefaultSubwayLines();
		initEventListeners();
		initCreateSubwayLineForm();
	};
}

const adminLine = new AdminLine();
adminLine.init();
