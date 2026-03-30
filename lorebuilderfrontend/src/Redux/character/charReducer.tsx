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
    leftArmGear: Array<string>,
    rightArmGear: Array<string>,
    accessories: Array<object>, // array = [ Hashmap<accessoryName, description> ]
    headGear: Array<string>, // array = [name, description, image]
    chestGear: Array<string>, // array = [name, description, image]
    backGear: Array<string>, // array = [name, description, image]
    leggingGear: Array<string>, // array = [name, description, image]
    footGear: Array<string> // array = [name, description, image],
}

type onlyAttributes = Omit<stateTypeAttributes, "equipment">;

type stateTypeAttributes = {
    magic: string, //   
    skills: string, //
    strength: string, //
    personality: string, //
    equipment: equipmentType,
    physicalInfo: string, //

    hobbies: string,
    interests: string,
    occupation: string,
    images: Array<string> // Filepath for character images

    title: string
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
            weaponMainHand: [''],
            weaponOffHand: [''],
            accessories: [{}],
            headGear: [''],
            chestGear: [''],
            backGear: [''],
            leggingGear: [''],
            footWear: ['']
        },
        physicalInfo: '',

        hobbies: '',
        interests: '',
        occupation: '',
        images: [''],

        title: '',
        name: ''
    }
}

// type stateType = stateTypeOrigins & stateTypeAttributes

export default function charReducer(
    state = initialState, 
    action: {
        type: string, 
        payload: equipmentType | stateTypeAttributes | stateTypeOrigins;
        })
    {
    switch (action.type) {
        case 'char/editOrigins': {
            if ("past" in action.payload) {
                // let payload : stateTypeOrigins = action.payload.origins;
                let { images } = action.payload;
                let newImageArr = state.origins.images;
                for (let i = 0; i <= images.length - 1; i++) {
                    let image = images[i];
                    if (!newImageArr.includes(image)) {
                        newImageArr.push(image);
                    }
                }   

                return {
                    ...state,
                    origins: {
                        ...action.payload,
                        images: newImageArr
                    }
                }
            }
        }

        case 'char/editAttributes': {
            var payload : equipmentType | onlyAttributes;
            if ("weaponMainHand" in action.payload) {
                payload = action.payload;
                return;
            } else if ("name" in action.payload) {
                payload = action.payload;
                let { images } = payload;
                let newImageArr = state.attributes.images;
                for (let i = 0; i <= images.length - 1; i++) {
                    let image = images[i];
                    if (!newImageArr.includes(image)) {
                        newImageArr.push(image);
                    }
                }  
                return {
                    ...state,
                    attributes: {
                        ...payload,
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