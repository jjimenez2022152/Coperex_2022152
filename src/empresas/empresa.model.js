import mongoose from 'mongoose';

const EmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    impacto: {
        type: String,
        required: [true, "El impacto es obligarorio"],
    },
    años: {
        type: int,
        required: [true, "Los años son obligatorios"],
    },
    telefono: {
        type: int,
        required: [true, "El numero de telefono es obligatorio"],
    },
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligarorio"],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

EmpresaSchema.methods.toJSON = function () {
    const { __v, _id, ...empresa } = this.toObject(); // Se eliminó 'password' ya que no parece ser parte del modelo Empresa
    empresa.uid = _id;
    return empresa;
};

export default mongoose.model('Empresa', EmpresaSchema);