# 📁 rename

[![npm version](https://badge.fury.io/js/@gilbertbv95%2Frename.svg)](https://www.npmjs.com/package/@gilbertbv95/rename)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Renombra archivos usando expresiones regulares y sincroniza automáticamente los nombres de videos con sus subtítulos.

## ✨ Características

- 🔄 Renombra archivos basados en patrones Regex
- 🎬 Sincroniza nombres de videos con sus subtítulos
- 🤖 Integración con IA (LangChain + Google GenAI)
- 🚀 CLI fácil de usar
- 📝 Soporte para múltiples formatos de subtítulos

## 📦 Instalación

### Instalación global (recomendada)
```bash
npm install -g @gilbertbv95/rename
```

### 📋 Requisitos para la integracion con IA
    API Key: Google AI (Gemini)
    Variable de entorno: GOOGLE_API_KEY debe estar configurada

## 🚀 Uso del comando rename
``` bash
rename --path <directorio> [opciones]
rename -h
```

### 📖 Ejemplos prácticos
```bash
# Archivos originales:
# "Mi.Serie.S01E01.HDTV.x264-GROUP.mkv"
# "Mi.Serie.S01E02.HDTV.x264-GROUP.mkv"

rename --path "D:\\Series\\Mi Serie" --regex '/\./g'

# Resultado:
# "Mi Serie S01E01 HDTV x264-GROUP.mkv"
# "Mi Serie S01E02 HDTV x264-GROUP.mkv"
```

## 📞 Soporte
- 🐛 Reportar bugs: [Issues](https://github.com/gilbertbv95/rename/issues)
- 📖 Ver código: [GitHub](https://github.com/gilbertbv95/rename)
- ⭐ Danos una estrella: [Star en GitHub](https://github.com/gilbertbv95/rename)