document.addEventListener("DOMContentLoaded", function () {
    mapMetaDataInHeader();
    mapSocialLinksData();
    mapStatsData();
});

function mapMetaDataInHeader() {
    var tagElement = document.getElementById("tag-label");
    tagElement.innerText = 'Full Stack Flutter Expert';

    let firstName = 'Klaynight';
    let lastName = 'Light';

    var firstNameElement = document.getElementById("first-name");
    firstNameElement.innerHTML = firstName;

    var lastNameElement = document.getElementById("last-name");
    lastNameElement.innerHTML = lastName;

}

function mapSocialLinksData() {
    let socials = [
        {
            "icon": "fa fa-globe",
            "value": "https://hubgames.studio"
        },
        {
            "icon": "fa fa-github",
            "value": "https://github.com/klaynight-dev"
        },
        {
            "icon": "fa fa-instagram",
            "value": "https://instagram.com/klaynight"
        },
        {
            "icon": "fa fa-twitter",
            "value": "https://twitter.com/leklaynight"
        }
    ];

    // icons in top section
    for (var i = 0; i < socials.length; i++) {
        var anchor = document.createElement("a");
        anchor.className = "social-icon-wrapper";

        var icon = document.createElement("i");
        icon.className = "social-icon " + socials[i]["icon"];

        var link = socials[i]["value"];
        anchor.href = link;
        anchor.target = "_blank";

        anchor.appendChild(icon);

        var socialHandles = document.getElementById("social-handles");
        socialHandles.appendChild(anchor);
    }

    // icons in contact section
    for (var i = 0; i < socials.length; i++) {
        var anchor = document.createElement("a");
        anchor.className = "social-icon-wrapper";
        anchor.style.padding = "3%";

        var icon = document.createElement("i");
        icon.className = "social-icon " + socials[i]["icon"];

        var link = socials[i]["value"];
        anchor.href = link;
        anchor.target = "_blank";

        anchor.appendChild(icon);

        var socialHandlsContact = document.getElementById("social-contact-icons");
        var extraDiv = document.createElement("div");

        socialHandlsContact.appendChild(extraDiv);
        socialHandlsContact.appendChild(anchor);
        socialHandlsContact.appendChild(extraDiv);
    }
}

function mapStatsData() {
    let stats = [
        {
            "value": "~4",
            "text-1": "Années",
            "text-2": "D'Experiences"
        },
        {
            "value": "10+",
            "text-1": "Projets Fini",
            "text-2": "Dans 4+ Pays"
        },
        {
            "value": "~11k",
            "text-1": "Contenus",
            "text-2": "Recherchés & Vus"
        }
    ];

    for (var i = 0; i < stats.length; i++) {
        var stat = stats[i];
        var value = stat["value"];
        var txt1 = stat["text-1"];
        var txt2 = stat["text-2"];

        var div = document.createElement("div");
        div.className = "stats stats-data";

        var valueText = document.createElement("h1");
        valueText.className = "value";
        valueText.textContent = value;

        var textColumn = document.createElement("div");
        textColumn.className = "stats-label-column";

        var text1 = document.createElement("div");
        text1.className = "label stats-label";
        text1.innerHTML = txt1;

        var text2 = document.createElement("div");
        text2.className = "label stats-label";
        text2.innerHTML = txt2;

        textColumn.appendChild(text1);
        textColumn.appendChild(text2);

        div.appendChild(valueText);
        div.appendChild(textColumn);

        var overaAllStatsDiv = document.getElementById("overall-stats");
        overaAllStatsDiv.append(div);
    }
}