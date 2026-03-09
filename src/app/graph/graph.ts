

interface Location{
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface Path{
    loc_A: Location;
    loc_B: Location;
    distance: number;
}

class Graph {

    private locations: Map<string, Location>;
    private locations_index: Map<string, number>; // assigns locations to index for matrix
    private matrix: number[][];

    constructor(){
        this.locations = new Map();
        this.locations_index = new Map();
        this.matrix = new Array();
    }

    add_node(location: Location):void{
        if (this.locations.has(location.id)) {
            throw new Error(`Location ${location.name} already exists`);
        }

        // adds one to size of locations_index map
        const new_index = this.locations.size; 
        this.locations.set(location.id, location);
        this.locations_index.set(location.id, new_index);

        // adds new column and new row to matrix
        for (const row of this.matrix){
            row.push(0);
        }
        const new_row = new Array(this.locations.size).fill(0);
        this.matrix.push(new_row);

        for (const [old_id, old_loc] of this.locations){
            if (old_id == location.id){
                continue;
            }

            const i = this.locations_index.get(old_id);
            if (i === undefined){
                throw new Error("Location not found");
            }
            
            const distance = this.calculate_distance(old_loc, location);
            this.matrix[i]![new_index] = distance;
            this.matrix[new_index]![i] = distance;
        }

    }
    remove_node():void{}

    calculate_distance(locA: Location, locB: Location): number{
        const dx = locB.lat - locA.lat;
        const dy = locB.lng - locA.lng;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
}