pub fn inner_prod(a: &[f32], b: &[f32]) -> f32 {
    a.iter().zip(b.iter()).map(|(x, y)| x * y).sum()
}

pub fn inplace_emul(a: &mut [f32], b: &[f32]) {
    a.iter_mut().zip(b.iter()).for_each(|(x, y)| *x *= y);
}

pub fn inplace_ediv(a: &mut [f32], b: &[f32]) {
    a.iter_mut().zip(b.iter()).for_each(|(x, y)| *x /= y);
}

pub fn inplace_add(a: &mut [f32], b: &[f32]) {
    a.iter_mut().zip(b.iter()).for_each(|(x, y)| *x += y);
}

pub fn inplace_sub(a: &mut [f32], b: &[f32]) {
    a.iter_mut().zip(b.iter()).for_each(|(x, y)| *x -= y);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_inner_prod() {
        assert_eq!(inner_prod(&[1., 2., 3.], &[4., 5., 6.]), 32.);
    }

    #[test]
    fn test_inplace_emul() {
        let mut x = [1.0_f32, 2., 3.];
        inplace_emul(&mut x, &[4., 5., 6.]);
        assert_eq!(&x, &[4.0, 10., 18.]);
    }

    #[test]
    fn test_inplace_ediv() {
        let mut x = [1.0_f32, 2., 3.];
        inplace_ediv(&mut x, &[4., 5., 6.]);
        assert_eq!(&x, &[0.25, 0.4, 0.5]);
    }

    #[test]
    fn test_inplace_add() {
        let mut x = [1.0_f32, 2., 3.];
        inplace_add(&mut x, &[4., 5., 6.]);
        assert_eq!(&x, &[5.0, 7.0, 9.0]);
    }

    #[test]
    fn test_inplace_sub() {
        let mut x = [1.0_f32, 2., 3.];
        inplace_sub(&mut x, &[4., 5., 6.]);
        assert_eq!(&x, &[-3.0, -3.0, -3.0]);
    }
}
