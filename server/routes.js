const express = require('express')
const routes = express.Router()


// Obtener todos los pacientes
routes.get('/pacientes', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM pacientes', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

// Obtener paciente por ID
routes.get('/pacientes/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM ips_crud.pacientes WHERE pacientes.idpaciente = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

// Crear un nuevo paciente
routes.post('/addpaciente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO pacientes set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente añadido correctamente!')
        })
    })
})


// Actualizar pacientes
routes.put('/updatepaciente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE pacientes set ? WHERE idpaciente = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente actualizado correctamente!')
        })
    })
})


// Eliminar paciente
routes.delete('/deletepaciente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM pacientes WHERE idpaciente = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente eliminado correctamente!')
        })
    })
})


// Obtener Paciente con todas sus citas
routes.get('/paciente-cita', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM pacientes INNER JOIN citas ON pacientes.idpaciente = citas.idpaciente', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


// Obtener todas las citas
routes.get('/citas', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM citas', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

// Obtener paciente por ID
routes.get('/citas/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM ips_crud.citas WHERE citas.idpaciente = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


// Crear una nueva cita
routes.post('/addcitas', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO citas set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cita añadida correctamente!')
        })
    })
})

// Actualizar citas
routes.put('/updatecita/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE citas set ? WHERE idcita = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cita actualizada correctamente!')
        })
    })
})

// Eliminar citas
routes.delete('/deletecitas/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM citas WHERE idcita = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cita eliminada correctamente!')
        })
    })
})






module.exports = routes