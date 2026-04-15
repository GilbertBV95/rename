import yoctoSpinner from "yocto-spinner";

export const spinner = yoctoSpinner({
    text: 'Recorriendo ficheros',
    spinner: {
        "interval": 100,
        "frames": [
            "( ●    )",
            "(  ●   )",
            "(   ●  )",
            "(    ● )",
            "(     ●)",
            "(    ● )",
            "(   ●  )",
            "(  ●   )",
            "( ●    )",
            "(●     )"
        ]
    }
});