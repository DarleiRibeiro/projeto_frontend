const fs = require('fs');

const bairros = [
    {
        bairro: 'Centro',
        equipamentos: [
            {
                título: 'Cadeira',
                nome: 'Cadeira dobrável',
                dono_cpf: '123456789',
                valor: 10.0,
                disponível: true,
                emprestadoatual: null
            },
            {
                título: 'Mesa',
                nome: 'Mesa de escritório',
                dono_cpf: '987654321',
                valor: 50.0,
                disponível: true,
                emprestadoatual: null
            }
        ]
    },
    {
        bairro: 'Cidade Nova',
        equipamentos: [
            {
                título: 'Furadeira',
                nome: 'Furadeira elétrica',
                dono_cpf: '543216789',
                valor: 30.0,
                disponível: true,
                emprestadoatual: null
            },
            {
                título: 'Serra circular',
                nome: 'Serra circular de bancada',
                dono_cpf: '987612345',
                valor: 80.0,
                disponível: true,
                emprestadoatual: null
            }
        ]
    },
    {
        bairro: 'Aleixo',
        equipamentos: [
            {
                título: 'Bicicleta',
                nome: 'Bicicleta mountain bike',
                dono_cpf: '543210987',
                valor: 20.0,
                disponível: true,
                emprestadoatual: null
            },
            {
                título: 'Câmera',
                nome: 'Câmera DSLR',
                dono_cpf: '123450987',
                valor: 100.0,
                disponível: true,
                emprestadoatual: null
            }
        ]
    },
    {
        bairro: 'Cidade de Deus',
        equipamentos: [
            {
                título: 'Aspirador de pó',
                nome: 'Aspirador de pó portátil',
                dono_cpf: '543216780',
                valor: 40.0,
                disponível: true,
                emprestadoatual: null
            },
            {
                título: 'Fogão',
                nome: 'Fogão 4 bocas',
                dono_cpf: '987650123',
                valor: 150.0,
                disponível: true,
                emprestadoatual: null
            }
        ]
    },
    {
        bairro: 'Compensa',
        equipamentos: [
            {
                título: 'Caixa de som',
                nome: 'Caixa de som Bluetooth',
                dono_cpf: '543210987',
                valor: 50.0,
                disponível: true,
                emprestadoatual: null
            },
            {
                título: 'Violão',
                nome: 'Violão acústico',
                dono_cpf: '123456780',
                valor: 80.0,
                disponível: true,
                emprestadoatual: null
            }
        ]
    }
];

fs.writeFileSync('dados_bairros.json', JSON.stringify(bairros, null, 4));
