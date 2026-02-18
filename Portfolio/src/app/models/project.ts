export class Project {
    constructor(
        public id:number = 0,
        public nom:string="",
        public id_categorie:number=1,
        public dates:string="2025",
        public infrastructure:string="",
        public statut:string="Prévu",
        public taille_equipe:number=1,
        public starred:boolean=false,
        public description:string=""
    ){}
}