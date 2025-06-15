window.onload = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  const voiceBtn = document.getElementById("voiceBtn");

  const qaList = [
    {
      questionKeywords: [
        "what is stem racing all about",
        "what's stem racing",
        "stem racing"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3D/main/Q1.mp3",
      githubLink: "https://github.com/shahadAlmohammadi/3D"
    },
    {
      questionKeywords: [
        "who is velora racing",
        "who is vellora racing",
        "who is valora racing",
        "who is velore racing",
        "who is billora racing",
        "who is vlora racing",
        "who is velura racing",
        "who is velora recent",
        "who is the elaboration"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3D/main/Q2.mp3",
      githubLink: "https://github.com/shahadAlmohammadi/3D"
    },
    {
      questionKeywords: [
        "what makes velora’s car special",
        "what makes veloras car special",
        "what makes velora car special",
        "what makes velora’s car so special",
        "what makes the car special",
        "what makes velora car special"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3D/main/Q3.mp3",
      githubLink: "https://github.com/shahadAlmohammadi/3D"
    },
    {
      questionKeywords: [
        "what are the highlights of velora’s pit display",
        "what are the highlights of veloras pit display",
        "what are the highlights of velora pit display",
        "what are the highlights of the pit display",
        "highlights of velora pit display"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3D/main/Q4.mp3",
      githubLink: "https://github.com/shahadAlmohammadi/3D"
    },
    {
      questionKeywords: [
        "what’s your advice for future stem competitors",
        "what is your advice for future stem competitors",
        "what's your advice for future stem competitors",
        "advice for future stem competitors",
        "what advice for stem competitors"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3D/main/Q5.mp3",
      githubLink: "https://github.com/shahadAlmohammadi/3D"
    }
  ];

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", text);

    let matchedQA = null;
    for (const qa of qaList) {
      if (qa.questionKeywords.some((kw) => text.includes(kw))) {
        matchedQA = qa;
        break;
      }
    }

    if (matchedQA) {
      const audio = new Audio(matchedQA.audioSrc);
      audio.play();
    } else {
      speak("Sorry, I did not understand.");
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Sorry, I couldn't hear you clearly.");
    voiceBtn.textContent = "🎤 Talk to me";
    voiceBtn.disabled = false;
  };

  recognition.onend = () => {
    voiceBtn.textContent = "🎤 Talk to me";
    voiceBtn.disabled = false;
  };

  voiceBtn.addEventListener("click", () => {
    if (voiceBtn.disabled) {
      console.log("Recognition already started");
      return;
    }

    try {
      recognition.start();
      voiceBtn.textContent = "Listening...";
      voiceBtn.disabled = true;
      console.log("Recognition started");
    } catch (error) {
      console.error("Failed to start recognition:", error);
    }
  });
};
