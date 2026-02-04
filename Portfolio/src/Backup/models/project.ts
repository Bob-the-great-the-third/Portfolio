export class Project {
    constructor(
        public id:number = 0,
        public nom:string="",
        public categorie:string="Perso",
        public dates:string="2025",
        public infrastructure:string="",
        public statut:string="Prévu",
        public taille_equipe:number=1
    ){}
}