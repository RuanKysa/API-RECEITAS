import React, { useState } from 'react';
import styles from '../styles/Chef.module.css';
import Notification from '../components/Notification';

export default function Chef() {
    const [imagemPreview, setImagemPreview] = useState(null);
    const [nomeReceita, setNomeReceita] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [novoIngrediente, setNovoIngrediente] = useState('');
    const [modoPreparo, setModoPreparo] = useState('');
    const [tempoPreparo, setTempoPreparo] = useState('');
    const [tempoCozimento, setTempoCozimento] = useState('');
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addIngrediente = () => {
        if (novoIngrediente.trim()) {
            setIngredientes([...ingredientes, novoIngrediente.trim()]);
            setNovoIngrediente('');
        }
    };

    const removeIngrediente = (index) => {
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        let formErrors = {};

        if (!nomeReceita.trim()) formErrors.nomeReceita = 'Nome da receita é obrigatório.';
        if (ingredientes.length === 0) formErrors.ingredientes = 'Pelo menos um ingrediente é obrigatório.';
        if (!modoPreparo.trim()) formErrors.modoPreparo = 'Modo de preparo é obrigatório.';
        if (!tempoPreparo.trim() || !/^\d+(\.\d+)?$/.test(tempoPreparo)) formErrors.tempoPreparo = 'Tempo de preparo é obrigatório e deve ser um número.';
        if (!tempoCozimento.trim() || !/^\d+(\.\d+)?$/.test(tempoCozimento)) formErrors.tempoCozimento = 'Tempo de cozimento é obrigatório e deve ser um número.';
        if (!imagemPreview) formErrors.imagem = 'Imagem da receita é obrigatória.';

        return formErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false); 
            return;
        }

        const novaReceita = {
            id: Date.now().toString(),
            titulo: nomeReceita,
            ingredientes,
            modoPreparo,
            tempoPreparo,
            tempoCozimento,
            imagem: imagemPreview
        };

        try {
            const res = await fetch('/api/receitas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaReceita),
            });

            if (res.ok) {
                const data = await res.json();
                setNotification(`Receita adicionada com sucesso! ID: ${data.id}`);
                setNomeReceita('');
                setIngredientes([]);
                setModoPreparo('');
                setTempoPreparo('');
                setTempoCozimento('');
                setImagemPreview(null);
                setErrors({});
            } else {
                alert('Erro ao adicionar receita.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar receita.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <div>
                <div className={styles.container}>
                    <h1>Formulário de Novas Receitas</h1>
                </div>
                <div className={styles.form}>
                    <form className={styles.card} onSubmit={handleSubmit}>
                        <ul className={styles.itens}>
                            <li>
                                <label>Imagem da Receita:</label>
                                <input
                                    type="file"
                                    name="imagemReceita"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {imagemPreview && <img src={imagemPreview} alt="Preview" className={styles.imagemPreview} />}
                                {errors.imagem && <span className={styles.error}>{errors.imagem}</span>}
                            </li>
                            <li>
                                <label>Nome da Receita:</label>
                                <input
                                    type="text"
                                    name="nomeReceita"
                                    value={nomeReceita}
                                    onChange={(e) => setNomeReceita(e.target.value)}
                                    placeholder="Nome da receita"
                                    className={errors.nomeReceita ? styles.errorInput : ''}
                                />
                                {errors.nomeReceita && <span className={styles.error}>{errors.nomeReceita}</span>}
                            </li>
                            <li className={styles.ingredientesContainer}>
                                <label>Ingredientes:</label>
                                <input
                                    type="text"
                                    name="novoIngrediente"
                                    value={novoIngrediente}
                                    onChange={(e) => setNovoIngrediente(e.target.value)}
                                    placeholder="Novo ingrediente"
                                    className={styles.ingredientesInput + (errors.ingredientes ? ' ' + styles.errorInput : '')}
                                />
                                <button type="button" className={styles.adicionarBtn} onClick={addIngrediente}>Adicionar</button>
                                {errors.ingredientes && <span className={styles.error}>{errors.ingredientes}</span>}
                            </li>
                            {ingredientes.length > 0 && (
                                <ul className={styles.ingredientesList}>
                                    {ingredientes.map((ingrediente, index) => (
                                        <li key={index}>
                                            {ingrediente}
                                            <button type="button" onClick={() => removeIngrediente(index)}>Remover</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <li>
                                <label>Modo de Preparo:</label>
                                <input
                                    type="text"
                                    name="modoPreparo"
                                    value={modoPreparo}
                                    onChange={(e) => setModoPreparo(e.target.value)}
                                    placeholder="Modo de preparo"
                                    className={errors.modoPreparo ? styles.errorInput : ''}
                                />
                                {errors.modoPreparo && <span className={styles.error}>{errors.modoPreparo}</span>}
                            </li>
                            <li>
                                <label>Tempo de Preparo:</label>
                                <input
                                    type="number"
                                    name="tempoPreparo"
                                    value={tempoPreparo}
                                    onChange={(e) => setTempoPreparo(e.target.value)}
                                    placeholder="Tempo de preparo"
                                    className={errors.tempoPreparo ? styles.errorInput : ''}
                                />
                                {errors.tempoPreparo && <span className={styles.error}>{errors.tempoPreparo}</span>}
                            </li>
                            <li>
                                <label>Tempo de Cozimento:</label>
                                <input
                                    type="number"
                                    name="tempoCozimento"
                                    value={tempoCozimento}
                                    onChange={(e) => setTempoCozimento(e.target.value)}
                                    placeholder="Tempo de cozimento"
                                    className={errors.tempoCozimento ? styles.errorInput : ''}
                                />
                                {errors.tempoCozimento && <span className={styles.error}>{errors.tempoCozimento}</span>}
                            </li>
                            <button className={styles.btn} type="submit" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </ul>
                    </form>
                </div>
                {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            </div>
        </>
    );
}
