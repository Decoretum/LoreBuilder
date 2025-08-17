type stateTypeOrigins = {
    past: string, //
    present: string, //
    dreams: string,
    gender: string,
    images: Array<string> // Filepath
    }

type equipmentType = {
    weaponMainHand: Array<string>, // array = [name, description, image]
    weaponOffHand: Array<string>, // array = [name, description, image]
    accessories: Array<object>, // array = [ Hashmap<accessoryName, description> ]
    headGear: Array<string>, // array = [name, description, image]
    chestGear: Array<string>, // array = [name, description, image]
    backGear: Array<string>, // array = [name, description, image]
    leggingGear: Array<string>, // array = [name, description, image]
    footWear: Array<string> // array = [name, description, image]
}

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
    images: Array<string> // Filepath

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
        payload: any
        })
    {
    switch (action.type) {
        case 'char/editOrigins': {
            let payload : stateTypeOrigins = action.payload.origins;
            console.log(payload)
            let { images } = payload;
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
                    ...payload,
                    images: newImageArr
                }
            }
        }

        case 'char/editAttributes': {
            let payload : stateTypeAttributes = action.payload.attributes;
            console.log(payload)
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

        default: {
            return state;
        }
    }
}