const btnInvite = document.getElementById('inviteBtn');
const btnSpin = document.getElementById('spinBtn');
const result = document.getElementById('result');

const stages = [3, 2, 5, 10];
let currentStage = 0;
let invited = 0;
const maxStages = stages.length;

btnInvite.onclick = () => {
  const link = window.location.href + '?ref=' + Math.floor(Math.random()*1e6);
  navigator.clipboard.writeText(link);
  invited++;
  alert(`Ссылка скопирована! Приглашено: ${invited}/${stages[currentStage]}`);
  if (invited >= stages[currentStage]) {
    btnSpin.disabled = false;
  }
};

btnSpin.onclick = () => {
  invited = 0;
  currentStage++;
  btnSpin.disabled = true;

  const sectors = [
    { prize:'нихуя', chance:30 },
    { prize:'нихуя', chance:30 },
    { prize:'Деф на 3 дня', chance:10 },
    { prize:'Деф на неделю', chance:8 },
    { prize:'Деф на месяц', chance:5 },
    { prize:'Эвакуация ш/з‑трц', chance:5 },
    { prize:'Приватка', chance:7 },
    { prize:'2$', chance:5 }
  ];
  const total = sectors.reduce((sum,e)=>sum+e.chance,0);
  let rand = Math.random() * total;
  let prize=null;
  for (let s of sectors) {
    rand -= s.chance;
    if (rand <= 0) { prize = s.prize; break; }
  }

  if (prize === 'нихуя') {
    result.innerText = '💨 Вы выиграли: нихуя\nВ следующий раз повезёт...';
  } else {
    result.innerText = `🎉 Вы выиграли: ${prize}\nЧтобы его получить — напишите сюда: @sevecid`;
  }

  if (currentStage >= maxStages) {
    result.innerText += '\n⏳ Приходите через 3 дня';
  }
};
