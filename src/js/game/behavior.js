const TileActions = {
    Assassin: {
        front: {
            '[-2,0]': 'jump slide',
            '[2,-2]': 'jump slide',
            '[2,2]': 'jump slide'
        },
        back: {
            '[-2,-2]': 'jump slide',
            '[-2,2]': 'jump slide',
            '[2,0]': 'jump slide'
        }
    },
    Bowman: {
        front: {
            '[-1,0]': 'move',
            '[0,1]': 'move',
            '[0,-1]': 'move',
            '[0,-2]': 'jump',
            '[0,2]': 'jump',
            '[2,0]': 'jump'
        },
        back: {
            '[-1,0]': 'move',
            '[1, -1]': 'move',
            '[1, 1]': 'move',
            '[-1, -1]': 'strike',
            '[-2, 0]': 'strike',
            '[-1, 1]': 'strike'
        }
    },
    Champion: {
        front: {
            '[-1,0]': 'move',
            '[0,1]': 'move',
            '[1,0]': 'move',
            '[0,-1]': 'move',
            '[-2,0]': 'jump',
            '[0,2]': 'jump',
            '[2,0]': 'jump',
            '[0,-2]': 'jump'
        },
        back: {
           '[-1,0]': 'strike',
            '[0,1]': 'strike',
            '[1,0]': 'strike',
            '[0,-1]': 'strike',
            '[-2,0]': 'jump',
            '[0,2]': 'jump',
            '[2,0]': 'jump',
            '[0,-2]': 'jump'
        }
    },
    Dragoon: {
        front: {
            '[0,-1]': 'move',
            '[0,1]': 'move',
            '[-2,-2]': 'strike',
            '[-2,0]': 'strike',
            '[-2,2]': 'strike'
        },
        back: {
            '[-1,0]': 'move',
            '[-2,0]': 'move',
            '[-2,-1]': 'jump',
            '[-2,1]': 'jump',
            '[1, -1]': 'slide',
            '[1, 1]': 'slide'
        }
    },
    Duchess: {
        front: {
            '[0,1]': 'move',
            '[0,-1]': 'move',
            '[2,0]': 'move'
        },
        back: {
           '[0,1]': 'move',
            '[0,-1]': 'move',
            '[2,0]': 'move'
        }
    },
    Duke: {
        front: {
            '[0,-1]': 'slide',
            '[0,1]': 'slide'           
        },
        back: {
            '[-1,0]': 'slide',
            '[1,0]': 'slide'
        }
    },
    Footman: {
        front: {
            '[1,0]': 'move',
            '[-1,0]': 'move',
            '[0,1]': 'move',
            '[0,-1]': 'move'
        },
        back: {
            '[-2,0]': 'move',
            '[1,-1]': 'move',
            '[1,1]': 'move',
            '[-1,-1]': 'move',
            '[-1,1]': 'move'
        }
    },
    Knight: {
        front: {
            '[-2,-1]': 'jump',
            '[-2,1]': 'jump',
            '[0,-1]': 'move',
            '[0,1]': 'move',
            '[1,0]': 'move',
            '[2,0]': 'move'
        },
        back: {
            '[-1,0]': 'slide',
            '[1,-1]': 'move',
            '[1,1]': 'move',
            '[2,-2]': 'move',
            '[2,2]': 'move'
        }
    },
    Longbowman: {
        front: {
            '[-1,0]': 'move',
            '[0,1]': 'move',
            '[1,0]': 'move',
            '[0,-1]': 'move'
        },
        back: {
           '[-2,0]': 'strike',
           '[-3,0]': 'strike',
           '[1,-1]': 'move',
           '[1,1]': 'move',
        }
    },
    Marshall: {
        front: {
            '[0,-1]': 'slide',
            '[0,1]': 'slide',
            '[-2,-2]': 'jump',
            '[-2,2]': 'jump',
            '[2,0]': 'jump'
        },
        back: {
            '[-1,-1]': 'move',
            '[-1,0]': 'move',
            '[-1,1]': 'move',
            '[0,-2]': 'move',
            '[0,-1]': 'move',
            '[0,1]': 'move',
            '[0,2]': 'move',
            '[1,-1]': 'move',
            '[1,1]': 'move'
        }
    },
    Oracle: {
        front: {
            '[-1,-1]': 'move',
            '[-1,1]': 'move',
            '[1,-1]': 'move',
            '[1,1]': 'move'
        },
        back: {}
    },
    Pikeman: {
        front: {
            '[-2,-2]': 'move',
            '[-1,-1]': 'move',
            '[-1,1]': 'move',
            '[-2,2]': 'move'
        },
        back: {
            '[-2,-1]': 'strike',
            '[-2,1]': 'strike',
            '[-1,0]': 'move',
            '[1,0]': 'move',
            '[2,0]': 'move'
        }
    },
    Priest: {
        front: {
            '[-1,-1]': 'slide',
            '[-1,1]': 'slide',
            '[1,-1]': 'slide',
            '[1,1]': 'slide'
        },
        back: {
           '[-1,-1]': 'move',
            '[-1,1]': 'move',
            '[1,-1]': 'move',
            '[1,1]': 'move',
            '[-2,-2]': 'jump',
            '[-2,2]': 'jump',
            '[2,-2]': 'jump',
            '[2,2]': 'jump'
        }
    },
    Ranger: {
        front: {
            '[-1,0]': 'slide',
            '[1,0]': 'slide',
            '[-2,-1]': 'jump',
            '[-2,1]': 'jump',
            '[-1,-2]': 'jump',
            '[-1,2]': 'jump'
        },
        back: {
           '[-1,-1]': 'slide',
            '[-1,1]': 'slide',
            '[2,-1]': 'jump',
            '[2,1]': 'jump',
        }
    },
    Seer: {
        front: {
            '[-2,0]': 'jump',
            '[0,2]': 'jump',
            '[2,0]': 'jump',
            '[0,-2]': 'jump',
            '[-1,-1]': 'move',
            '[-1,1]': 'move',
            '[1,-1]': 'move',
            '[1,1]': 'move'
        },
        back: {
            '[-2,-2]': 'jump',
            '[-2,2]': 'jump',
            '[2,-2]': 'jump',
            '[2,2]': 'jump',
            '[-1,0]': 'move',
            '[1,0]': 'move',
            '[0,-1]': 'move',
            '[0,1]': 'move'

        }
    },
    Wizard: {
        front: {
            '[-1,-1]': 'move',
            '[-1,0]': 'move',
            '[-1,1]': 'move',
            '[0,-1]': 'move',
            '[0,1]': 'move',
            '[1,-1]': 'move',
            '[1,0]': 'move',
            '[1,1]': 'move',
        },
        back: {
            '[-2,-2]': 'jump',
            '[-2,0]': 'jump',
            '[-2,2]': 'jump',
            '[0,-2]': 'jump',
            '[0,2]': 'jump',
            '[2,-2]': 'jump',
            '[2,0]': 'jump',
            '[2,2]': 'jump',
        }
    },
}

export default TileActions;