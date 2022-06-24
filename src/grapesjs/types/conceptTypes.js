const grupo = "grupo"; // -1,
const Numerico = "Numerico"; // 0,
const Texto = "Texto"; // 1,
const Fecha = "Fecha"; // 2,
const Memorando = "Memorando"; // 3,
const Opcion = "Opcion"; // 4,
const Seleccion = "Selección"; // 5,
const Comentario = "Comentario"; // 6,
const Hora = "Hora"; // 7,
const Grafica = "Grafica"; // 8,
const FirmaDigital = "FirmaDigital"; // 9,
const Tabla = "Tabla"; // 10,
const Etiqueta = "Etiqueta"; // 11,
const GraficaXY = "GraficaXY"; // 12,
const Formula = "Formula"; // 13,
const TextoFijo = "TextoFijo"; // 14,
const ListaDesplegable = "ListaDesplegable"; // 15,
const ListaAsociada = "ListaAsociada"; // 16,
const TextoSegmentado = "TextoSegmentado"; // 17,
const FormulaOpcion = "FormulaOpcion"; // 18,
const FormulaFactorRiesgo = "FormulaFactorRiesgo"; // 19,
const Grafica_CyD_Talla = "Grafica_CyD_Talla"; // 20,
const Grafica_CyD_Peso = "Grafica_CyD_Peso"; // 21,
const Grafica_CyD_PesoTalla = "Grafica_CyD_PesoTalla"; // 22,
const Grafica_CyD_IMC = "Grafica_CyD_IMC"; // 23,
const Grilla = "Grilla"; // 24,
const EscalaAbreviadaDesarrollo_MotricidadGruesa = "EscalaAbreviadaDesarrollo_MotricidadGruesa"; // 25,
const EscalaAbreviadaDesarrollo_MotricidadFina = "EscalaAbreviadaDesarrollo_MotricidadFina"; // 26,
const EscalaAbreviadaDesarrollo_AudicionLenguaje = "EscalaAbreviadaDesarrollo_AudicionLenguaje"; // 27,
const EscalaAbreviadaDesarrollo_PersonalSocial = "EscalaAbreviadaDesarrollo_PersonalSocial"; // 28,
const Semaforo = "Semaforo"; // 29,
const ResumenMotiricidad = "ResumenMotiricidad"; // 30,
const AntecedentesFamiliares = "AntecedentesFamiliares"; // 31,
const ListaCriterio = "ListaCriterio"; // 32,
const Osics10 = "Osics10"; // 33,
const Phantom = "Phantom"; // 34,
const Grafica_PAR = "Grafica_PAR"; // 35,
const Grafica_TEAD = "Grafica_TEAD"; // 36,
//Disponible Enum del 37 - 39

const Grafica_Altura_Uterina = "Grafica_Altura_Uterina"; // 40,
const Grafica_Peso_Semanas = "Grafica_Peso_Semanas"; // 41,
const Grafica_PerimetroCefalico = "Grafica_PerimetroCefalico"; // 42,

//Disponible Enum del 43 - 79

const Odontograma = "Odontograma"; // 80,
const Higieneograma = "Higieneograma"; // 81,

//Disponible Enum 82 - 96

const Glasgow = "Glasgow"; // 97,
const RIPS1 = "RIPS1"; // 98,
const RIPS2 = "RIPS2"; // 99,
const Linea = "Linea"; // 100,
const Partograma = "Partograma"; // 101,
const AutoCompletar = "AutoCompletar"; // 102,
const NotaEvolucion = "NotaEvolucion"; // 103,
const AnestesiaTransOperatorio = "AnestesiaTransOperatorio"; // 104,
const SignosVitales = "SignosVitales"; // 105,
const ConvencionesGrafico = "ConvencionesGrafico"; // 106,
const Familiograma = "Familiograma"; // 107,
const OdontogramaHC = "OdontogramaHC"; // 108,
const FotografiaHC = "FotografiaHC"; // 109,
const VozHC = "VozHC"; // 110,
const Periodontograma = "Periodontograma"; // 111,
const IndicePlacaBacterianaSilness_Loe = "IndicePlacaBacterianaSilness_Loe"; // 112,

//Disponible Enum 113 - 119

const EscalaIntensidad = "EscalaIntensidad"; // 120,
const Audiometria = "Audiometria"; // 121,
const EscalaDesarrolloHC = "EscalaDesarrolloHC"; // 122,
const OrtodonciaHC = "OrtodonciaHC"; // 123,
const ICDAS_Simplificado = "ICDAS_Simplificado"; // 124,
const ICDAS_SegundoEnfoque2 = "ICDAS_SegundoEnfoque2"; // 125,
const InsumosQuirurgicos = "InsumosQuirurgicos"; // 126,
const IndiceGingivalModificado = "IndiceGingivalModificado"; // 127,
const IndiceNecesTratPeriodontal = "IndiceNecesTratPeriodontal"; // 128,
const IndiceExtensionSeveridad = "IndiceExtensionSeveridad"; // 129,
const ExamenIntraoral = "ExamenIntraoral"; // 130,
const RadiografiasCoronales = "RadiografiasCoronales"; // 131,
const RadiografiasPeriapicales = "RadiografiasPeriapicales"; // 132

const getTypeNumberConcepto = string => {
    switch (string) {
        case grupo: return -1;
        case Numerico: return 0;
        case Texto: return 1;
        case Fecha: return 2;
        case Memorando: return 3;
        case Opcion: return 4;
        case Seleccion: return 5;
        case Comentario: return 6;
        case Hora: return 7;
        case Grafica: return 8;
        case FirmaDigital: return 9;
        case Tabla: return 10;
        case Etiqueta: return 11;
        case GraficaXY: return 12;
        case Formula: return 13;
        case TextoFijo: return 14;
        case ListaDesplegable: return 15;
        case ListaAsociada: return 16;
        case TextoSegmentado: return 17;
        case FormulaOpcion: return 18;
        case FormulaFactorRiesgo: return 19;
        case Grafica_CyD_Talla: return 20;
        case Grafica_CyD_Peso: return 21;
        case Grafica_CyD_PesoTalla: return 22;
        case Grafica_CyD_IMC: return 23;
        case Grilla: return 24;
        case EscalaAbreviadaDesarrollo_MotricidadGruesa: return 25;
        case EscalaAbreviadaDesarrollo_MotricidadFina: return 26;
        case EscalaAbreviadaDesarrollo_AudicionLenguaje: return 27;
        case EscalaAbreviadaDesarrollo_PersonalSocial: return 28;
        case Semaforo: return 29;
        case ResumenMotiricidad: return 30;
        case AntecedentesFamiliares: return 31;
        case ListaCriterio: return 32;
        case Osics10: return 33;
        case Phantom: return 34;
        case Grafica_PAR: return 35;
        case Grafica_TEAD: return 36;
        case Grafica_Altura_Uterina: return 40;
        case Grafica_Peso_Semanas: return 41;
        case Grafica_PerimetroCefalico: return 42;
        case Odontograma: return 80;
        case Higieneograma: return 81;
        case Glasgow: return 97;
        case RIPS1: return 98;
        case RIPS2: return 99;
        case Linea: return 100;
        case Partograma: return 101;
        case AutoCompletar: return 102;
        case NotaEvolucion: return 103;
        case AnestesiaTransOperatorio: return 104;
        case SignosVitales: return 105;
        case ConvencionesGrafico: return 106;
        case Familiograma: return 107;
        case OdontogramaHC: return 108;
        case FotografiaHC: return 109;
        case VozHC: return 110;
        case Periodontograma: return 111;
        case IndicePlacaBacterianaSilness_Loe: return 112;
        case EscalaIntensidad: return 120;
        case Audiometria: return 121;
        case EscalaDesarrolloHC: return 122;
        case OrtodonciaHC: return 123;
        case ICDAS_Simplificado: return 124;
        case ICDAS_SegundoEnfoque2: return 125;
        case InsumosQuirurgicos: return 126;
        case IndiceGingivalModificado: return 127;
        case IndiceNecesTratPeriodontal: return 128;
        case IndiceExtensionSeveridad: return 129;
        case ExamenIntraoral: return 130;
        case RadiografiasCoronales: return 131;
        case RadiografiasPeriapicales: return 13;
    }
}

const getTypeConcepto = number => {
    switch (number) {
        case -1: return grupo; // -1,
        case 0: return Numerico; // 0,
        case 1: return Texto; // 1,
        case 2: return Fecha; // 2,
        case 3: return Memorando; // 3,
        case 4: return Opcion; // 4,
        case 5: return Seleccion; // 5,
        case 6: return Comentario; // 6,
        case 7: return Hora; // 7,
        case 8: return Grafica; // 8,
        case 9: return FirmaDigital; // 9,
        case 10: return Tabla; // 10,
        case 11: return Etiqueta; // 11,
        case 12: return GraficaXY; // 12,
        case 13: return Formula; // 13,
        case 14: return TextoFijo; // 14,
        case 15: return ListaDesplegable; // 15,
        case 16: return ListaAsociada; // 16,
        case 17: return TextoSegmentado; // 17,
        case 18: return FormulaOpcion; // 18,
        case 19: return FormulaFactorRiesgo; // 19,
        case 20: return Grafica_CyD_Talla; // 20,
        case 21: return Grafica_CyD_Peso; // 21,
        case 22: return Grafica_CyD_PesoTalla; // 22,
        case 23: return Grafica_CyD_IMC; // 23,
        case 24: return Grilla; // 24,
        case 25: return EscalaAbreviadaDesarrollo_MotricidadGruesa; // 25,
        case 26: return EscalaAbreviadaDesarrollo_MotricidadFina; // 26,
        case 27: return EscalaAbreviadaDesarrollo_AudicionLenguaje; // 27,
        case 28: return EscalaAbreviadaDesarrollo_PersonalSocial; // 28,
        case 29: return Semaforo; // 29,
        case 30: return ResumenMotiricidad; // 30,
        case 31: return AntecedentesFamiliares; // 31,
        case 32: return ListaCriterio; // 32,
        case 33: return Osics10; // 33,
        case 34: return Phantom; // 34,
        case 35: return Grafica_PAR; // 35,
        case 36: return Grafica_TEAD; // 36,
        //Disponible Enum del 37 - 39

        case 40: return Grafica_Altura_Uterina; // 40,
        case 41: return Grafica_Peso_Semanas; // 41,
        case 42: return Grafica_PerimetroCefalico; // 42,

        //Disponible Enum del 43 - 79

        case 80: return Odontograma; // 80,
        case 81: return Higieneograma; // 81,

        //Disponible Enum 82 - 96

        case 97: return Glasgow; // 97,
        case 98: return RIPS1; // 98,
        case 99: return RIPS2; // 99,
        case 100: return Linea; // 100,
        case 101: return Partograma; // 101,
        case 102: return AutoCompletar; // 102,
        case 103: return NotaEvolucion; // 103,
        case 104: return AnestesiaTransOperatorio; // 104,
        case 105: return SignosVitales; // 105,
        case 106: return ConvencionesGrafico; // 106,
        case 107: return Familiograma; // 107,
        case 108: return OdontogramaHC; // 108,
        case 109: return FotografiaHC; // 109,
        case 110: return VozHC; // 110,
        case 111: return Periodontograma; // 111,
        case 112: return IndicePlacaBacterianaSilness_Loe; // 112,

        //Disponible Enum 113 - 119

        case 120: return EscalaIntensidad; // 120,
        case 121: return Audiometria; // 121,
        case 122: return EscalaDesarrolloHC; // 122,
        case 123: return OrtodonciaHC; // 123,
        case 124: return ICDAS_Simplificado; // 124,
        case 125: return ICDAS_SegundoEnfoque2; // 125,
        case 126: return InsumosQuirurgicos; // 126,
        case 127: return IndiceGingivalModificado; // 127,
        case 128: return IndiceNecesTratPeriodontal; // 128,
        case 129: return IndiceExtensionSeveridad; // 129,
        case 130: return ExamenIntraoral; // 130,
        case 131: return RadiografiasCoronales; // 131,
        case 13: return RadiografiasPeriapicales; // 132
    }
}

export {
    grupo, Numerico, Texto, Fecha, Memorando, Opcion, Seleccion, Comentario, Hora, Grafica, FirmaDigital,
    Tabla, Etiqueta, GraficaXY, Formula, TextoFijo, ListaDesplegable, ListaAsociada, TextoSegmentado,
    FormulaOpcion, FormulaFactorRiesgo, Grafica_CyD_Talla, Grafica_CyD_Peso, Grafica_CyD_PesoTalla,
    Grafica_CyD_IMC, Grilla, EscalaAbreviadaDesarrollo_MotricidadGruesa, EscalaAbreviadaDesarrollo_MotricidadFina,
    EscalaAbreviadaDesarrollo_AudicionLenguaje, EscalaAbreviadaDesarrollo_PersonalSocial, Semaforo,
    ResumenMotiricidad, AntecedentesFamiliares, ListaCriterio, Osics10, Phantom, Grafica_PAR, Grafica_TEAD,
    Grafica_Altura_Uterina, Grafica_Peso_Semanas, Grafica_PerimetroCefalico, Odontograma, Higieneograma,
    Glasgow, RIPS1, RIPS2, Linea, Partograma, AutoCompletar, NotaEvolucion, AnestesiaTransOperatorio,
    SignosVitales, ConvencionesGrafico, Familiograma, OdontogramaHC, FotografiaHC, VozHC, Periodontograma,
    IndicePlacaBacterianaSilness_Loe, EscalaIntensidad, Audiometria, EscalaDesarrolloHC, OrtodonciaHC,
    ICDAS_Simplificado, ICDAS_SegundoEnfoque2, InsumosQuirurgicos, IndiceGingivalModificado,
    IndiceNecesTratPeriodontal, IndiceExtensionSeveridad, ExamenIntraoral, RadiografiasCoronales,
    RadiografiasPeriapicales, getTypeNumberConcepto, getTypeConcepto
}
