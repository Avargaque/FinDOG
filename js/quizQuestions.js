export const quizQuestions = [
	{
		id: 1,
		question: "Dlaczego chcesz psa? Wybierz jeden najważniejszy powód:",
		answers: ["By zyskać bliskiego przyjaciela", "By służył jako kompan dla moich dzieci", "By mieć towarzysza do spacerów i innych aktywności fizycznych", "Dla obrony domu i bliskich"],
		inputType: "radio",
		userAnswerRadio: "",
		// dużo, w tym rozmiar i waga
	},
	{
		id: 2,
		question:
			"Czy posiadałeś wcześniej własnego psa?",
		answers: [
			"Nie",
			"Tak",
			"Tak, i to kilka na raz",
		],
		inputType: "radio",
		userAnswerRadio: "",
		// nudziarz, trudność, uparty
	},
	{
		id: 3,
		question: "Gdzie będziecie mieszkać?",
		answers: ["W mieszkaniu", "W domu wolnostojącym"],
		inputType: "radio",
		userAnswerRadio: "",
		// podejscie do nieznajomych, aktywność, nudziarz, wartownik, szczekliwość
	},
	{
		id: 4,
		question: "Jak duże podwórko pies bedzie miał do dyspozycji?",
		answers: ["Brak podwórka", "Małe podwórko", "Duże podwórze, ogród"],
		inputType: "checkbox",
		userAnswerRadio: "",
		// aktywność, nudziarz
	},
	{
		id: 5,
		question: "Jak duży ruch ma miejsce przy podwórku, na którym przebywać będzie pies?",
		answers: ["Brak podwórka", "Niewielki ruch", "Duży ruch"],
		inputType: "radio",
		userAnswerRadio: "",
		// podejście do nieznajomych, wartownik
	},
	{
		id: 6,
		question: "Gdzie pies będzie mieszkał i sypiał?",
		answers: ["Będzie mieszkał i spał w domu, ze mną w łóżku", "Będzie mieszkał i spał w domu, ale poza łóżkiem", "Będzie mieszkał i spał na zewnątrz", "Różnie"],
		inputType: "radio",
		userAnswerRadio: "",
		// przywiązanie, podejście do nieznajomych, może być sam
	},
	{
		id: 7,
		question: "Czy w twoim domu dominuje cisza i spokój, czy jest raczej głośno i ruchliwie? Weź pod uwagę domowników, inne zwierzęta, gości czy ogólny hałas.",
		answers: ["Jest cicho i spokojnie", "Jest głośno i ruchliwie", "Coś pomiędzy"],
		inputType: "radio",
		userAnswerRadio: "",
		// dobry z dziećmi, dobry z innymi zwierzętami, podejście do nieznajomych, wartownik, szczekliwość, przystosowanie do zmian, może być sam
	},
	{
		id: 8,
		question: "Jak bardzo istotne dla ciebie jest, aby pies był przyjazny dzieciom?",
		answers: ["Bez znaczenia", "Ważne", "Kluczowe"],
		inputType: "radio",
		userAnswerRadio: "",
		// przywiązanie, dobry z dziećmi, zabawa, aktywność, uparty, rozmiar, waga
	},
	{
		id: 9,
		question: "Jak często planujesz wychodzić z psem na spacery i jak długie one będą?",
		answers: ["Wcale lub tylko w celu wypróżnienia", "Często, lecz krótkie", "Rzadko, lecz długie", "Często i długie"],
		inputType: "radio",
		userAnswerRadio: "",
		// aktywność, nudziarz, podejście do nieznajomych, dobry z innymi zwierzętami
	},
	{
		id: 10,
		question: "Preferujesz psa mocno przywiązanego i nieodstępującego cię o krok czy bardziej niezależnego i potrafiącego się sobą zająć?",
		answers: ["Przywiązanego", "Niezależnego", "Pomiędzy"],
		inputType: "radio",
		userAnswerRadio: "",
		// przywiązanie, może być sam
	},
	{
		id: 11,
		question: "Czy to istotne, aby pies dobrze znosił przebywanie samemu w domu?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// przywiązanie, może być sam
	},
	{
		id: 12,
		question: "Czy otoczenie psa (miejsce zamieszkania, domownicy, styl życia) często będzie ulegać zmianie?",
		answers: ["Tak", "Nie", "Ciężko powiedzieć"],
		inputType: "radio",
		userAnswerRadio: "",
		// przystosowanie do zmian
	},
	{
		id: 13,
		question: "Czy posiadasz inne zwierzęta domowe, z którymi pies będzie miał bliską styczność?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// przywiązanie, dobry z innymi zwierzętami, może być sam, uparty
	},
	{
		id: 14,
		question: "Wolisz, aby pies łatwo ufał nowym osobom?",
		answers: ["Tak", "Nie", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// podejscie do nieznajomych, wartownik
	},
	{
		id: 15,
		question: "Czy preferujesz, by twój pies pełnił rolę strażnika ostrzegając przed obcymi?",
		answers: ["Tak", "Nie", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// wartownik, szczekliwosc
	},
	{
		id: 16,
		question: "Czy przeszkadza ci częste szczekanie psa?",
		answers: ["Tak", "Trochę", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// szczekliwość
	},
	{
		id: 17,
		question:
			"Czy przeszkadza ci kiedy pies bywa uparty i nie zawsze słucha swojego właściciela?",
		answers: ["Tak", "Trochę", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// uparty
	},
	{
		id: 18,
		question: "Czy preferujesz bardzo aktywnego psa, wymagającego dużo ruchu?",
		answers: ["Tak, wolę aktywnego", "Nie, wolę mniej wymagającego ruchu", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// aktywność
	},
	{
		id: 19,
		question: "Czy preferujesz psa, który stale potrzebuje wymagającego zajęcia?",
		answers: ["Tak", "Nie, wolę takiego, który sam się sobą zajmie", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// nudziarz
	},
	{
		id: 20,
		question: "Czy preferujesz psa, który uwielbia bawić się z tobą bez końca?",
		answers: ["Tak", "Nie, wolę takiego, który nie domaga się zabawy", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// zabawa
	},
	{
		id: 21,
		question: "Czy preferujesz psa, który kocha trening i poznawanie nowych sztuczek?",
		answers: ["Tak", "Nie", "Bez znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		// trening
	},
	{
		id: 22,
		question: "Jak bardzo przeszkadza ci konieczność częstego czesania psa?",
		answers: ["Bardzo", "Trochę", "Wcale"],
		inputType: "radio",
		userAnswerRadio: "",
		// czesanie
	},
	{
		id: 23,
		question: "Jak bardzo przeszkadza ci duża ilość sierści zostawianej przez psa?",
		answers: ["Bardzo", "Trochę", "Wcale"],
		inputType: "radio",
		userAnswerRadio: "",
		// linienie
	},
	{
		id: 24,
		question: "Jak bardzo przeszkadza ci ślinienie się psa?",
		answers: ["Bardzo", "Trochę", "Wcale"],
		inputType: "radio",
		userAnswerRadio: "",
		// ślinienie
	},
	{
		id: 25,
		question: "Jakiego rozmiaru psa szukasz? (Możesz wybrać kilka odpowiedzi)",
		answers: ["Mały", "Średni", "Duży"],
		inputType: "checkbox",
		userAnswersCheckbox: [],
		// rozmiar (height)
	},
	{
		id: 26,
		question: "Jaką długość sierści powinien mieć pies? (Możesz wybrać kilka odpowiedzi)",
		answers: ["Krótka", "Średnia", "Długa"],
		inputType: "checkbox",
		userAnswersCheckbox: [],
		// sierść
	},
	{
		id: 27,
		question: "Czy preferujesz rasy żyjące jak najdłużej?",
		answers: ["Tak", "Trochę", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// długość życia
	},
	{
		id: 28,
		question: "Czy zależy ci na tym, aby dobrana rasa była jak najłatwiej dostępna do pozyskania w naszym kraju?",
		answers: ["Tak", "Trochę", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		// dostępność
	}
];


