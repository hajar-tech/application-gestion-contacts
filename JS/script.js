// Déclaration de la liste (utilisée uniquement pour le stockage temporaire)
let contacts = [];

// Sélectionner l'élément qui va stocker les infos de chaque contact
const contactDetail = document.getElementById('contact-detail');

// Sélectionner l'élément qui va stocker la liste des contacts
const listContacts = document.getElementById('contactList');

// Si je suis sur la page "ajouter.html"
if (document.getElementById('form-contact')) {
    document.getElementById('btn').addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher la soumission du formulaire

        // Appeler la fonction AjouterContact
        AjouterContact();

        // Réinitialiser le formulaire après l'ajout
        document.getElementById('form-contact').reset();
    });
}

// Fonction d'ajout
function AjouterContact() {
    // Récupérer les valeurs du formulaire
    const nom = document.getElementById("validationServer01").value.trim();
    const prenom = document.getElementById("validationServer02").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const ville = document.getElementById("villeSelect").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();
    let genre = "";

    const genreChoisie = document.getElementsByClassName('form-check-input');
    for (let i = 0; i < genreChoisie.length; i++) {
        if (genreChoisie[i].checked) {
            genre = genreChoisie[i].value.trim();
            break;
        }
    }

    // Vérifier que tous les champs obligatoires sont remplis
    if (!nom || !prenom || !email || !phone || !ville || !genre) {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
    }

    // Création de l'objet contact
    const contact = { nom, prenom, email, genre, ville, phone };

    // Charger les contacts existants depuis localStorage
    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Ajouter le nouveau contact à la liste
    existingContacts.push(contact);

    // Mettre à jour localStorage
    localStorage.setItem("contacts", JSON.stringify(existingContacts));

    // Rediriger vers la page affiche.html
    window.location.href = 'affiche.html';
}

// Si je suis sur la page "affiche.html"
if (document.getElementById('contactList')) {
    AfficherContact();
}

// Fonction afficher
function AfficherContact() {
    // Charger les contacts depuis localStorage
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Réinitialiser la liste affichée
    listContacts.innerHTML = '';

    // Ajouter chaque contact à la liste
    storedContacts.forEach((contact) => {
        const item = document.createElement('li');
        item.className = 'contact-item';
        item.innerHTML = `
        <div style="cursor: pointer; background-color: white; border-radius: 16px; padding-top : 5px;">
        <div style = "display : flex; gap : 15px; margin:10px;">
            <img src="./../Assets/icons-afficher/icons8-profile-picture-48.png" alt="Avatar">
                <p style = "margin-top: 12px;">${contact.nom}</p>
                <p style = "margin-top: 12px;">${contact.prenom}</p>
        </div>
        <p style = " margin-left: 65px;">${contact.phone}</p>
        </div>
        `;
        listContacts.appendChild(item);

        // Ajouter un événement pour afficher plus de détails (optionnel)
        item.onclick = () => showContactDetail(contact);
    });
}

// Fonction pour afficher les détails d'un contact (optionnelle)
function showContactDetail(contact) {
    if (contactDetail) {
        contactDetail.innerHTML = `
        <main style="margin-top:100px; justify-content:center; ">
            <h3>Détails du contact</h3>
            <img src="./../Assets/icons-afficher/icons8-profile-picture-48.png" alt="Avatar" style = "width:100px; height:100px;" >
            <div style="display : flex; justify-content: space-around;  flex-wrap: wrap;"> <p><strong>Nom :</strong> ${contact.nom}</p>
                  <p><strong>Prénom :</strong> ${contact.prenom}</p>
            </div>
            <div style="display : flex; justify-content: space-around;  flex-wrap: wrap;"> <p><strong>Email :</strong> ${contact.email}</p>
                  <p><strong>Ville :</strong> ${contact.ville}</p>
            </div>
            <div style="display : flex; justify-content: space-around;  flex-wrap: wrap;"> <p><strong>Téléphone :</strong> ${contact.phone}</p>
                  <p><strong>Genre :</strong> ${contact.genre}</p>
            </div>
        </main>    
        `;
    }
}
