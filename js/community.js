document.addEventListener("DOMContentLoaded", function () {
    mapCommunityData();
});

function mapCommunityData() {

    let communities = [
        {
            "name": "Google Developer Student Clubs",
            "role": "GDSC Lead",
            "session": "Juin 2022 - Février 2023",
            "logo": "images/community/dsc.png",
            "link": "https://gdsc.community.dev/comsats-university-islamabad-campus/",
            "details": "Google Developer Student Clubs (Clubs d'étudiants de développeurs Google)- Formation de centaines d'étudiants sur diverses technologies telles que Flutter, Tensorflow, Git et GitHub, etc."
        },
        {
            "name": "Microsoft Student Ambassador",
            "role": "Student Ambassador",
            "session": "Juin 2022 - Février 2023",
            "logo": "images/community/mlsa.png",
            "link": "https://mlsa.pk/",
            "details": "Microsoft Student Ambassador - A aidé les étudiants dans les technologies d'apprentissage comme Python, Azure et GitHub pour leurs projets à l'université et dans la vie réelle. J'ai appris la gestion d'équipe, la gestion d'événements et j'ai aidé d'autres étudiants à développer leur carrière en tant qu'ambassadeur étudiant."
        }
    ];

    for (var i = 0; i < communities.length; i++) {
        var com = communities[i];
        var name = com.name;
        var role = com.role;
        var session = com.session;
        var logo = com.logo;
        var link = com.link;
        var details = com.details;

        var card = document.createElement("a");
        card.className = "community-card";

        var image = document.createElement('img');
        image.className = "community-logo";
        image.src = logo;
        image.alt = name;

        var info = document.createElement("div");
        info.className = "community-info";

        var cName = document.createElement("p");
        cName.className = "body1 c-title";
        cName.textContent = name;

        var cRole = document.createElement("span");
        cRole.className = "body2 c-position";
        cRole.innerHTML = role;

        var cSession = document.createElement("p");
        cSession.className = "label c-session";
        cSession.textContent = session;

        info.appendChild(cName);
        info.appendChild(cRole);
        info.appendChild(cSession);

        card.appendChild(image);
        card.appendChild(info);

        card.href = link;
        card.target = "_blank";

        var communitiesDiv = document.getElementById("communities");
        communitiesDiv.append(card);

        var point = document.createElement("li");
        point.className = "body2 cw-point";
        point.innerHTML = details;

        var points = document.getElementById("cw-points");
        points.appendChild(point);
    }
}