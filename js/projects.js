document.addEventListener("DOMContentLoaded", function () {
    mapProjectsData();
});

function mapProjectsData() {
    let projects = [
        {
            "title": "Alkadia SMP",
            "image": "images/projects/alkadia.png",
            "type": "Minecraft Server",
            "labels": [
                {
                    "title": "Web",
                    "link": "https://undefined"
                }
            ]
        },
        {
            "title": "La Taverne du Survivant",
            "image": "images/projects/LTDS.png",
            "type": "Minecraft Server",
            "labels": [
                {
                    "title": "Web",
                    "link": "https://undefined"
                }
            ]
        },
        {
            "title": "HubGames Studio",
            "image": "images/projects/HubGames.jpeg",
            "type": "Site Web & Studio de developpement",
            "labels": [
                {
                    "title": "GitHub",
                    "link": "https://github.com/orgs/TheHubGames"
                },
                {
                    "title": "Web",
                    "link": "https://hubgames.studio/"
                },
                {
                    "title": "Jobs",
                    "link": "https://jobs.hubgames.studio/"
                }
            ]
        },
        {
            "title": "Klaynight Studio",
            "image": "images/projects/_87b425f9-9e40-4e9e-b57c-306568f6a672-removebg-preview.png",
            "type": "Studio de developpement",
            "labels": [
                {
                    "title": "Momentanement Indisponible",
                    "link": ""
                }
            ]
        },
        {
            "title": "Jobi",
            "image": "images/projects/Jobi.png",
            "type": "Application",
            "labels": [
                {
                    "title": "GitHub",
                    "link": "https://github.com/klaynight-dev/stock_gestion_library"
                },
                {
                    "title": "Web",
                    "link": "https://Jobi.klaynight.studio"
                }
            ]
        }
    ];

    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var title = project.title;
        var type = project.type;
        var image = project.image;

        var card = document.createElement('div');
        card.className = "project-card";

        var imageDiv = document.createElement('div');
        imageDiv.className = "p-image";
        var projectLabel = document.createElement("div");
        projectLabel.className = "label p-type";
        projectLabel.innerHTML = type;

        var projectImg = document.createElement("img");
        projectImg.className = "p-image-bg";
        projectImg.src = image;
        projectImg.alt = title;

        imageDiv.appendChild(projectLabel);
        imageDiv.appendChild(projectImg);

        var projectName = document.createElement("p");
        projectName.className = "body1 p-title";
        projectName.innerHTML = title;

        var labels = document.createElement("div");
        labels.className = "p-labels";

        for (var j = 0; j < project.labels.length; j++) {
            var title = project.labels[j]["title"];
            var link = project.labels[j]["link"];

            var label = document.createElement('a');
            label.className = "p-label";
            var labelIcon = document.createElement("i");

            if (title == "App") {
                labelIcon.className = "p-label-icon fa fa-apple";
            } else if (title == "Play") {
                labelIcon.className = "p-label-icon fa fa-google";
            } else if (title == "Web") {
                labelIcon.className = "p-label-icon fa fa-globe"; 
            } else if (title == "Jobs") {
                    labelIcon.className = "p-label-icon fa fa-file-text";
            } else if (title == "GitHub") {
                labelIcon.className = "p-label-icon fa fa-github";
            } else if (title == "GitHub") {
                labelIcon.className = "p-label-icon fa fa-cross";
            } else if (title == "Package") {
                labelIcon.className = "p-label-icon material-icons";
                labelIcon.innerHTML = "widgets";
                labelIcon.style.fontSize = "16px";
            }

            var labelText = document.createElement("span");
            labelText.className = "label p-label-text";
            labelText.innerHTML = title;

            label.href = link;
            label.target = "_blank";

            label.appendChild(labelIcon);
            label.appendChild(labelText);

            labels.appendChild(label);
        }


        card.appendChild(projectLabel);
        card.appendChild(projectImg);
        card.appendChild(projectName);
        card.appendChild(labels);

        var projectsDiv = document.getElementById("projects");
        projectsDiv.appendChild(card);
    }
}
