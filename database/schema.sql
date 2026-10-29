
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    marca VARCHAR(80) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(12, 2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE talles (
    id SERIAL PRIMARY KEY,
    numero NUMERIC(4, 1) NOT NULL UNIQUE
);

CREATE TABLE stock_productos (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    talle_id INTEGER NOT NULL REFERENCES talles(id),
    cantidad INTEGER NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
    UNIQUE (producto_id, talle_id)
);
