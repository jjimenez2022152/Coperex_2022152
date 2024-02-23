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
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"],
    },
});

/*EmpresaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}*/

export default mongoose.model('Empresa', EmpresaSchema);