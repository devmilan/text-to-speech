const synth = window.speechSynthesis;

//dom elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');



//Init voices
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //loop through all voices and create an option for each one

    voices.forEach(voice =>{
        const option = document.createElement('option');
        option.textContent = voice.name + '('+ voice.lang +')';

        //set attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    });
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}


//Speak
const speak = () => {
    //check if speaking
    if(synth.speaking){
        console.error('Already Speaking ...');
        return;
    }
    if(textInput !== ''){

        //background change
        body.style.background = '#fff';

        //Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e =>{
            //background change
            body.style.background = '#000';
            console.log('speak ended')
        }

        //speak error
        speakText.onerror = e => {
            console.log('something went wrong')
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop throuh voice
        voices.forEach(voice =>{
            if(voice.name ==selectedVoice){
                speakText.voice = voice;
            }
        })

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText);
     }
};

//on Submit
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//on rate value change 
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//on Pitch value change 
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//on voive change
voiceSelect.addEventListener('change', e = speak());