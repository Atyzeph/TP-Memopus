const url = "http://localhost:3000/";
const data = require("../mockAPI.json");

export async function fetchConnexion(username, password) {
    console.log("oui");
  const user = data.users.find((u) => u.username === username && u.password === password);
  if (!user) {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  console.log("Réussis");
  // Retourne l'id de l'utilisateur comme jeton de connexion réussie
  return user.id;
}

export function getTerms() {
    return fetch(url + "terms")
        .then(response => {
            console.log(`response status` + response.status);
            return response.json();
        })
        .then(terms => {
            return terms
        })
        .catch(error => {
            console.log(`erreur attrapée : ` + error);
        })
}

export function getCards() {
    return fetch(url + "cards", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            console.log(`response status`, response.status);
            return response.json();
        })
        .then(cards => {
            return cards
        })
        .catch(error => {
            console.log(`erreur attrapée : `, error);
        })
}

export function deleteCard(id) {
    return fetch(url + "cards/" + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
        }
        return response.json();
    })
        .then(data => {
            console.log('Objet supprimé avec succès');
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

export function createCard(card) {
    return fetch(url + "cards/", {
        method: "POST",
        body: JSON.stringify({
            "question": card.question,
            "answer": card.answer,
            "tid": card.tid,
            "cid": card.cid
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création');
        }
        return response.json();
    })
        .then(data => {
            console.log('Objet crée avec succès', data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

export function updateCard(card) {
    return fetch(url + "cards/" + card.id, {
      method: "PUT",
      body: JSON.stringify({
        "question": card.question,
        "answer": card.answer,
        "tid": card.tid,
        "cid": card.cid
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      return response.json();
    })
      .then(data => {
        console.log('Objet mis à jour avec succès');
        return data;
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }
  

// class MemoService {
//     static url = "http://localhost:3000/";

//     static getTerms() {
//         return fetch(this.url + "terms")
//             .then(response => {
//                 console.log(`response status`, response.status);
//                 return response.json();
//             })
//             .then(terms => {
//                 return terms
//             })
//             .catch(error => {
//                 console.log(`erreur attrapée : `, error);
//             })
//     }
//     static getTerms() {
//         return fetch(this.url + "terms")
//             .then(response => {
//                 console.log(`response status`, response.status);
//                 return response.json();
//             })
//             .then(terms => {
//                 return terms
//             })
//             .catch(error => {
//                 console.log(`erreur attrapée : `, error);
//             })
//     }

//     static getCards() {
//         return fetch(this.url + "cards")
//             .then(response => {
//                 console.log(`response status`, response.status);
//                 return response.json();
//             })
//             .then(cards => {
//                 return cards
//             })
//             .catch(error => {
//                 console.log(`erreur attrapée : `, error);
//             })
//     }

//     static deleteCard(id) {
//         return fetch(this.url + "cards/" + id, {
//             method: "DELETE",
//         }).then(response => {
//             if (!response.ok) {
//                 throw new Error('Erreur lors de la suppression');
//             }
//             return response.json();
//         })
//             .then(data => {
//                 console.log('Objet supprimé avec succès');
//             })
//             .catch(error => {
//                 console.error('Erreur :', error);
//             });
//     }
// }



