﻿define([], function() {
    return {
        deliverType: {
            1: '市内配送',
            2: '市内自取',
            3: 'EMS',
            4: '平邮'
        },
        IdCardType: {
            1: '身份证',
            2: '护照',
            3: '学生证',
            4: '军官证',
            6: '驾驶证',
            7: '回乡证',
            8: '台胞证',
            10: '港澳通行证',
            11: '国际海员证',
            20: '外国人永久居留证',
            21: '旅行证',
            22: '台湾通行证',
            23: '士兵证',
            24: '临时身份证',
            25: '户口簿',
            26: '警官证',
            99: '其它',
            100:'稍后提供'
        },
        idSort:[1,2,10,22,24,7,8,11,20,3,4,6,21,23,25,26,99,100]
    }
})