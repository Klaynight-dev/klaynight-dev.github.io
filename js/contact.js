document.addEventListener("DOMContentLoaded", function () {
    mapContactDetails();
    currentDate();
});

function mapContactDetails() {
    let contactInfo = [
        {
            "icon": "fa fa-phone",
            "label": "+33 7 69 36 67 22",
            //"link": "https://wa.me/33769366722"
        },
        {
            "icon": "fa fa-envelope",
            "label": "night.psr@gmail.com",
            "link": "mailto:night.psr@gmail.com"
        }
    ];

    for (var i = 0; i < contactInfo.length; i++) {
        var c = contactInfo[i];
        var icon = c.icon;
        var label = c.label;
        var link = c.link;

        var card = document.createElement("a");
        card.className = "contact-card";

        card.href = link;
        card.target = "_blank";

        var iconDiv = document.createElement("i");
        iconDiv.className = icon;
        iconDiv.id = "mail-icon";

        var labelDiv = document.createElement("span");
        labelDiv.className = "body2 contact-label";
        labelDiv.innerHTML = label;

        var chevDiv = document.createElement("i");
        chevDiv.id = "chevron-icon";
        chevDiv.className = "fa fa-chevron-right";

        card.appendChild(iconDiv);
        card.appendChild(labelDiv);
        card.appendChild(chevDiv);

        var contactInfoDiv = document.getElementById("contact-info-div");
        contactInfoDiv.insertBefore(card, contactInfoDiv.firstChild);
    }
}

//function onMeetClick() {
//    window.open("https://calendly.com/klaynight/meet", '_blank');
//}

function currentDate() {
    const current = new Date();
    let monthName = current.toLocaleDateString('fr', {
        month: "long",
    });

    let date = current.getDate();

    let dayName = current.toLocaleDateString('fr', {
        weekday: "long",
    });

    var monthText = document.getElementById("month");
    monthText.innerHTML = monthName;

    var dayText = document.getElementById("date");
    dayText.innerHTML = date;

    var weekDayText = document.getElementById("day");
    weekDayText.innerText = dayName;
}