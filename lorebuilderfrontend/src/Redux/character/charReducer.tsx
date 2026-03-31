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

export type onlyAttributes = Omit<stateTypeAttributes, "equipment">;

export type stateTypeAttributes = {
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
            leftArmGear: [''],
            rightArmGear: [''],
            accessories: [{}],
            headGear: [''],
            chestGear: [''],
            backGear: [''],
            leggingGear: [''],
            footGear: ['']
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
            let { images } = action.payload;
            let newImageArr = state.attributes.images;
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
                attributes: {
                    ...action.payload.attributes,
                    images: newImageArr
                    }
                }    
            


        }

        default: {
            return state;
        }
    }
}