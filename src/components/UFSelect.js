import React from 'react';
import { Select } from 'mui-rff'
import MenuItem from '@material-ui/core/MenuItem'

export const UFSelect = (props) => {
    return (
        <Select {...props}>
            <MenuItem value={'AC'}>AC</MenuItem>
            <MenuItem value={'AL'}>AL</MenuItem>
            <MenuItem value={'AP'}>AP</MenuItem>
            <MenuItem value={'AM'}>AM</MenuItem>
            <MenuItem value={'BA'}>BA</MenuItem>
            <MenuItem value={'CE'}>CE</MenuItem>
            <MenuItem value={'DF'}>DF</MenuItem>
            <MenuItem value={'ES'}>ES</MenuItem>
            <MenuItem value={'GO'}>GO</MenuItem>
            <MenuItem value={'MA'}>MA</MenuItem>
            <MenuItem value={'MT'}>MT</MenuItem>
            <MenuItem value={'MS'}>MS</MenuItem>
            <MenuItem value={'MG'}>MG</MenuItem>
            <MenuItem value={'PA'}>PA</MenuItem>
            <MenuItem value={'PB'}>PB</MenuItem>
            <MenuItem value={'PR'}>PR</MenuItem>
            <MenuItem value={'PE'}>PE</MenuItem>
            <MenuItem value={'PI'}>PI</MenuItem>
            <MenuItem value={'RJ'}>RJ</MenuItem>
            <MenuItem value={'RN'}>RN</MenuItem>
            <MenuItem value={'RS'}>RS</MenuItem>
            <MenuItem value={'RO'}>RO</MenuItem>
            <MenuItem value={'RR'}>RR</MenuItem>
            <MenuItem value={'SC'}>SC</MenuItem>
            <MenuItem value={'SP'}>SP</MenuItem>
            <MenuItem value={'SE'}>SE</MenuItem>
            <MenuItem value={'TO'}>TO</MenuItem>
        </Select>
    )
}