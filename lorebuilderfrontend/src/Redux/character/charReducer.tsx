export type stateTypeOrigins = {
    past: string, //
    present: string, //
    dreams: string,
    gender: string,
    images: Array<string> // Filepath
    }

type equipmentType = {
    weaponMainHand: Array<string>, // array = [name, description, image]
    weaponOffHand: Array<string>, // array = [name, description, image]
    leftArmGear: Array<string>, // array = [name, description, image]
    rightArmGear: Array<string>, // array = [name, description, image]
    accessories: Array<object>, // Hashmap<id, [accessoryName, description, image]>
    headGear: Array<string>, // array = [name, description, image]
    chestGear: Array<string>, // array = [name, description, image]
    backGear: Array<string>, // array = [name, description, image]
    leggingGear: Array<string>, // array = [name, description, image]
    footGear: Array<string> // array = [name, description, image],
}

export type accessoryType = Map<string, Array<string>>;


export type onlyAttributes = Omit<stateTypeAttributes, "equipment">;

export type stateTypeAttributes = {
    magic: string, //   
    skills: string, //
    strength: string, //
    personality: string, //
    equipment: equipmentType, // images left
    physicalInfo: string, //

    hobbies: string,
    interests: string,
    occupation: Array<string>,
    images: Array<string> // image addition

    title: string,
    subtitle: string,
    name: string
}

let initialState = {
    origins: {
        past: '',
        present: '',
        dreams: '',
        gender: '',
        images: ['']
    },
    attributes: {
        magic: '',
        skills: '',
        strength: '',
        personality: '',
        equipment: {
            weaponMainHand: new Map<string, Array<string>>(),
            weaponOffHand: new Map<string, Array<string>>(),
            leftArmGear: ['', ''],
            rightArmGear: ['', ''],
            accessories: new Map<string, Array<string>>(),
            headGear: ['', ''],
            chestGear: ['', ''],
            backGear: ['', ''],
            leggingGear: ['', ''],
            footGear: ['', '']
        },
        physicalInfo: '',

        hobbies: '',
        interests: '',
        occupation: ["", ""],
        images: [''],

        title: '',
        subtitle: "",
        name: ''
    }
}

// type stateType = stateTypeOrigins & stateTypeAttributes

export default function charReducer(
    state = initialState, 
    action: {
        type: string, 
        payload: any;
        }
        )
    {
    switch (action.type) {
        case 'char/editOrigins': {
                let { images } = action.payload;
                let newImageArr = state.origins.images;
                if (images != undefined) {
                    for (let i = 0; i <= images.length - 1; i++) {
                        let image = images[i];
                        if (!newImageArr.includes(image)) {
                            newImageArr.push(image);
                        }
                    }   
    
                }

                return {
                    ...state,
                    origins: {
                        ...action.payload.origins,
                        images: newImageArr
                    }
                }
        }

        case 'char/editAttributes': {
            console.log(action.payload.attributes);
            console.log(state)
            let { images } = action.payload;
            let newImageArr = state.attributes.images;
            var isEquipmentPayload = action.payload.attributes.equipment.hasOwnProperty("equipmentObject");
            if (images != undefined) {
                for (let i = 0; i <= images.length - 1; i++) {
                    let image = images[i];
                    if (!newImageArr.includes(image)) {
                        newImageArr.push(image);
                    }
                }    
            }
            if (isEquipmentPayload) {
                var equipmentPayload = action.payload.attributes.equipment.equipmentObject;
                var key = equipmentPayload["equipmentType"];
                var value = equipmentPayload["equipmentValue"];
                return {
                    ...state,
                    attributes: {
                        ...state.attributes,
                        equipment: {
                            ...state.attributes.equipment,
                            [key] : value
                        },
                        images: newImageArr
                    }
                }
            }

            else {
                return {
                    ...state,
                    attributes: {
                        ...action.payload.attributes,
                        images: newImageArr
                    }
                }    
    
            }
        }

        default: {
            return state;
        }
    }
}