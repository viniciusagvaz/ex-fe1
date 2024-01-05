let oldInterns;
let newInterns;
let firstTitle;
let lastTitle;

const handleAnimation = () => {
	const button = document.querySelector("#refresh-button");
	const internCards = document.querySelector("#intern-cards");

	button.classList.add("animation");

	setTimeout(() => {
		internCards.style.display = "block";
	}, 750);
};

function handleTime() {
	const timeDisplay = document.querySelector("#time");
	const hour = new Date().getHours();
	const minute = new Date().getMinutes();

	const formattedHour = hour.toString().padStart(2, "0");
	const formattedMinute = minute.toString().padStart(2, "0");

	timeDisplay.textContent = `${formattedHour}:${formattedMinute}`;
}

handleTime();

const getData = async () => {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/lukasbryt/trilhafront/main/test.json"
		);
		if (!response.ok) {
			throw new Error("Não foi possível resgatar os usuários");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

const handleInterns = async () => {
	try {
		const interns = await getData();

		oldInterns = interns[0].userName;
		newInterns = interns[1].userName;

		firstTitle = interns[0].title;
		lastTitle = interns[1].title;
	} catch (error) {
		console.error(error);
		alert("Não foi possível obter os dados dos estagiários");
	}
};
handleInterns().then(() => {
	renderInterns(oldInterns, newInterns);
	renderTitles(firstTitle, lastTitle);
});

const renderInterns = (oldInterns, newInterns) => {
	const oldInternsList = document.querySelector("#oldInternsList");
	const newInternsList = document.querySelector("#newInternsList");
	const h2 = document.querySelector("h2");
	const p = document.querySelector("p");

	h2.textContent = firstTitle;
	p.textContent = lastTitle;

	oldInterns.forEach(intern => {
		const li = document.createElement("li");

		li.textContent = intern;

		oldInternsList.appendChild(li);
	});

	newInterns.forEach(intern => {
		const li = document.createElement("li");

		li.textContent = intern;
		newInternsList.appendChild(li);
	});
};

const renderTitles = (firstTitle, lastTitle) => {
	const h2 = document.querySelector("h2");
	const p = document.querySelector("p");

	h2.textContent = firstTitle;
	p.textContent = lastTitle;
};
