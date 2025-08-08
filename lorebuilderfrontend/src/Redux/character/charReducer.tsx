type stateTypeOrigins = {
    past: string, //
    present: string, //
    dreams: string,
    images: Array<string> // Filepath
    }


type stateTypeAttributes = {
    magic: string, //
    skills: string, //
    strength: string, //
    personality: string, //
    equipment: string,
    physicalInfo: string, //

    hobbies: string,
    interests: string,
    occupation: string,
    images: Array<string> // Filepath
}

let initialState = {
    origins: {
        past: '',
        present: '',
        dreams: '',
        images: ['']
    },
    attributes: {
        magic: '',
        skills: '',
        strength: '',
        personality: '',
        equipment: '',
        physicalInfo: '',

        hobbies: '',
        interests: '',
        occupation: '',
        images: ['']
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
            let payload : any = action.payload.origins;
            console.log(action.payload.origins)
            let { images } : stateTypeOrigins = payload;
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
                    ...action.payload.origins,
                    images: newImageArr
                }
            }
        }

        case 'char/editAttributes': {
            let payload : any = action.payload.attributes;
            console.log(action.payload.attributes)
            let { images } : stateTypeAttributes = payload;
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