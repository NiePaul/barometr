document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let totalPoints = 0;
  
  // Pobierz wszystkie inputy w formularzu
  const inputs = document.querySelectorAll("#quizForm input");
  
  inputs.forEach(input => {
    if ((input.type === "radio" && input.checked) || (input.type === "checkbox" && input.checked)) {
      totalPoints += parseInt(input.getAttribute("data-points"));
    }
  });
  
  // Określenie komunikatu na podstawie sumy punktów
  let message = "";
  if(totalPoints >= 0 && totalPoints <= 13) {
    message = `<strong>Niska świadomość/praktyki prywatności (0–13 pkt)</strong><br>
               Twoja obecność w sieci jest jak otwarta księga – każdy ma wgląd we wszystkie strony. To czas, aby zacząć pracować nad zwiększeniem prywatności!`;
  } else if(totalPoints >= 14 && totalPoints <= 27) {
    message = `<strong>Umiarkowana świadomość/praktyki prywatności (14–27 pkt)</strong><br>
               Masz już pewne zabezpieczenia, ale nadal pozostawiasz ślady, które mogą ujawnić Twoją tożsamość. To jak chodzenie z zasłoną, która momentami opada – warto zainwestować w lepszą ochronę.`;
  } else if(totalPoints >= 28 && totalPoints <= 41) {
    message = `<strong>Wysoka świadomość/praktyki prywatności (28–41 pkt)</strong><br>
               Działasz świadomie i stosujesz wiele dobrych praktyk. Twoja obecność w sieci przypomina dobrze zaaranżowaną fortecę – niełatwo jest ją przebić, choć zawsze warto podnosić poprzeczkę.`;
  } else if(totalPoints >= 42 && totalPoints <= 55) {
    message = `<strong>Bardzo wysoka świadomość/praktyki prywatności (42–55 pkt)</strong><br>
               Jesteś widmem w sieci – Twoja obecność jest niemal niewidoczna, jak cień poruszający się po zakamarkach internetu. Twoje zaawansowane zabezpieczenia czynią Cię mistrzem prywatności, praktycznie nie złapanym dla ciekawskich oczu.`;
  } else {
    message = "Wystąpił błąd przy obliczaniu wyniku.";
  }
  
  document.getElementById("result").innerHTML = `<p>Zdobyte punkty: ${totalPoints}</p>${message}`;
});
