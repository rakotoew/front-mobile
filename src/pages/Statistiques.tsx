import Charts from "../components/Charts";
import React, {useEffect} from "react";
import HomeButton from "../components/HomeButton";
import axios from "axios";
import {apiUrl} from "./_app";

// convertit les données récupérées de l'api en un format utilisable par le composant Charts
function convertData(inputData: {resources: number[], humans: number[], research: number[]}): {data: number}[][] {
    const dataConverted = [];
    const row_resources = [];
    const row_humans = [];
    const row_research = [];
    for(let i = 0; i < inputData.resources.length; i++) {
        row_resources.push({data: inputData.resources[i]});
        row_humans.push({data: inputData.humans[i]});
        row_research.push({data: inputData.research[i]});
    }
    dataConverted.push(row_research);
    dataConverted.push(row_humans);
    dataConverted.push(row_resources);
    console.log("data : ");
    console.log(inputData);
    console.log("data converted : ");
    console.log(dataConverted);
    return dataConverted;
}

// requete pour recuperer les données d'un joueur specifique
async function retrieveData(playerName: string): Promise<PlayerData> {
    try {
        const response = await axios.get(apiUrl + `/retrieve/${playerName}`);
        console.log("retrieve player data for " + playerName + " got :");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return { resources: [0], humans: [0], research: [0] };
    }
}

// Requete pour récupérer la liste des joueurs
async function getPlayers(): Promise<string[]> {
    let players: string[] = [];
    // request to get the list of players from the api
    await axios.get(apiUrl + "/playerslist")
        .then(response => {
            console.log("get playerlist " + response.data);
            players = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    return players;
}


interface PlayerData {
    resources: number[];
    humans: number[];
    research: number[];
}
interface PlayerProps {
    playerList: string[];
    playerDatas: PlayerData[];
}


const getDatas = async (playerList: string[]) => {
    let promises: Promise<PlayerData>[] = playerList.map((player) => retrieveData(player));
    return Promise.all(promises);
};
export async function getServerSideProps(): Promise<{ props: PlayerProps }> {
    const playerList: string[] = await getPlayers();
    const playerDatas: PlayerData[] = await getDatas(playerList);
    console.log("playerlist : " + playerList);
    console.log("playerdatas : ");
    console.log(playerDatas);
    return {
        props: {
            playerList: playerList,
            playerDatas: playerDatas
        }
    };
}

export default function Statistiques({playerList, playerDatas} : PlayerProps) {
    // State variable that will hold the selected option
    let [selected, setSelected] = React.useState(playerList[0]);
    let [data, setData] = React.useState(convertData({resources: [0], humans: [0], research: [0]}));


    const getIdFromName = (playerName: string, playerlist: string[]): number => {
        let i = 0;
        for(i ; i < playerlist.length; i++) {
            if(playerlist[i] === playerName) {
                return i;
            }
        }
        return i;
    };

    useEffect(() => {
        setData(convertData(playerDatas[getIdFromName(selected, playerList)]));
    }, [playerDatas, selected, playerList]);

    console.log("init playerlist " + playerList);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 top-0">
            <HomeButton/>
            <p className="text-5xl text-blue-300 p-16 ">Données de la partie</p>
            <div className="flex flex-row items-center justify-center">
                <p className="text-xl text-blue-400 text-center p-4 w-full">Joueur : </p>
                <div className="relative w-full lg:max-w-sm">
                    <select value={selected} onChange={(e) => setSelected(e.target.value)}
                            className="w-96 p-2.5 text-gray-400 bg-gray-700 border-blue-500 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        {playerList.map((player:string) => (
                            <option key={player} value={player}>
                                {player}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-row">
                <div>
                    <p className="text-2xl text-blue-400 text-center p-4">Population :</p>
                    <Charts data={data[0]}></Charts>
                </div>
                <div>
                    <p className="text-2xl text-blue-400 text-center p-4">Ressources :</p>
                    <Charts data={data[1]}></Charts>
                </div>
                <div>
                    <p className="text-2xl text-blue-400 text-center p-4">Recherche : </p>
                    <Charts data={data[2]}></Charts>
                </div>
            </div>
        </div>);
}